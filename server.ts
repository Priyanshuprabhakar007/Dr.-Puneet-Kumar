import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import {
  getDatabase,
  getDatabaseAsync,
  saveDatabase,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  addContactLead,
  updateContactLead,
  deleteContactLead,
  addMediaItem,
  deleteMediaItem,
  initializeDatabase
} from './src/db/storage';
import { syncSectionToFirestore, getServerFirestore } from './src/db/firebaseServer';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  // Configure Express for proxy (GoDaddy / reverse proxy)
  app.set('trust proxy', 1);

  // Production environment configuration validation
  if (process.env.NODE_ENV === 'production') {
    const requiredEnv = [
      'ADMIN_USERNAME',
      'ADMIN_PASSWORD',
      'ADMIN_SESSION_SECRET',
      'FIREBASE_PROJECT_ID',
      'FIREBASE_CLIENT_EMAIL',
      'FIREBASE_PRIVATE_KEY',
      'FIREBASE_DATABASE_ID'
    ];
    const missing = requiredEnv.filter((env) => !process.env[env]);
    if (missing.length > 0) {
      console.error(`[Critical Configuration Error] Missing required production environment variables: ${missing.join(', ')}`);
      process.exit(1);
    }
  }

  // Initialize and hydrate database from Firestore on startup
  await initializeDatabase();

  // Security headers
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Request logger
  app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.url}`);
    }
    next();
  });

  // --- Authentication & Signed Session Cookies (timingSafeEqual + base64url) ---
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || crypto.randomBytes(32).toString('hex');

  function signCookie(payloadObj: object): string {
    const jsonStr = JSON.stringify(payloadObj);
    const encodedPayload = Buffer.from(jsonStr).toString('base64url');
    const sig = crypto.createHmac('sha256', ADMIN_SESSION_SECRET).update(encodedPayload).digest('base64url');
    return `${encodedPayload}.${sig}`;
  }

  function verifyCookie(signedVal: string): any | null {
    if (!signedVal) return null;
    const parts = signedVal.split('.');
    if (parts.length !== 2) return null;
    const [encodedPayload, sig] = parts;
    try {
      const expectedSig = crypto.createHmac('sha256', ADMIN_SESSION_SECRET).update(encodedPayload).digest('base64url');
      const sigBuffer = Buffer.from(sig);
      const expectedBuffer = Buffer.from(expectedSig);
      if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
        return null;
      }
      const jsonStr = Buffer.from(encodedPayload, 'base64url').toString('utf8');
      const data = JSON.parse(jsonStr);
      if (data.exp < Date.now()) {
        return null;
      }
      return data;
    } catch {
      return null;
    }
  }

  function parseCookies(req: Request): Record<string, string> {
    const list: Record<string, string> = {};
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return list;
    cookieHeader.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      if (parts.length === 2) {
        list[parts[0].trim()] = decodeURIComponent(parts[1].trim());
      }
    });
    return list;
  }

  const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const cookies = parseCookies(req);
    const sessionCookie = cookies['admin_session'];
    if (!sessionCookie) {
      return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
    }
    const data = verifyCookie(sessionCookie);
    if (!data) {
      return res.status(403).json({ error: 'Forbidden: Invalid or expired session signature' });
    }
    (req as any).adminUser = data.username;
    next();
  };

  // --- Rate Limiting Store ---
  const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

  function rateLimiter(limit: number, windowMs: number) {
    return (req: Request, res: Response, next: NextFunction) => {
      const ip = req.ip || req.socket.remoteAddress || 'unknown';
      const now = Date.now();
      let record = rateLimitStore.get(ip);

      if (!record || now > record.resetTime) {
        record = { count: 1, resetTime: now + windowMs };
        rateLimitStore.set(ip, record);
        return next();
      }

      record.count++;
      if (record.count > limit) {
        return res.status(429).json({ error: 'Too many requests, please try again later.' });
      }
      next();
    };
  }

  // --- API Routes ---

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), doctor: 'Dr. Puneet Kumar' });
  });

  // Admin Login (Rate limited: 5 attempts per 15 minutes)
  app.post('/api/admin/login', rateLimiter(5, 15 * 60 * 1000), (req, res) => {
    const { username, password } = req.body;
    const validUser = ADMIN_USERNAME || (process.env.NODE_ENV === 'production' ? '' : 'admin');
    const validPass = ADMIN_PASSWORD || (process.env.NODE_ENV === 'production' ? '' : 'doctor@puneet2026');

    if (!validUser || !validPass) {
      return res.status(500).json({ error: 'Admin credentials not configured' });
    }

    if (username === validUser && password === validPass) {
      const sessionVal = { username, exp: Date.now() + 8 * 60 * 60 * 1000 };
      const signed = signCookie(sessionVal);
      res.cookie('admin_session', signed, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 8 * 60 * 60 * 1000
      });
      return res.json({
        success: true,
        user: {
          username: validUser,
          role: 'Administrator',
          name: 'Dr. Puneet Kumar'
        }
      });
    }
    return res.status(401).json({ error: 'Invalid username or password' });
  });

  app.get('/api/admin/verify', requireAdmin, (req, res) => {
    res.json({ valid: true, user: { username: (req as any).adminUser, role: 'Administrator' } });
  });

  app.post('/api/admin/logout', (req, res) => {
    res.clearCookie('admin_session', { path: '/' });
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // Public: Get Sanitized Content (NEVER exposes appointments, contactLeads, or private notes)
  app.get('/api/content', async (req, res) => {
    try {
      const data = await getDatabaseAsync();
      const { appointments, contactLeads, ...publicContent } = data;
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.json(publicContent);
    } catch (err) {
      console.error('Error fetching content:', err);
      res.status(500).json({ error: 'Failed to fetch content' });
    }
  });

  // Admin: Update content section (Transactional: Awaits Firestore persistence before mutating cache)
  app.put('/api/content/:section', requireAdmin, async (req, res) => {
    try {
      let section = req.params.section as string;
      if (section === 'heroSection') section = 'hero';
      if (section === 'mediaAssets') section = 'media';
      const db = await getDatabaseAsync();

      if (!(section in db)) {
        return res.status(400).json({ error: `Section '${section}' does not exist` });
      }

      const updatedSectionData = req.body;
      // 3: Await syncSectionToFirestore first
      await syncSectionToFirestore(section, updatedSectionData);
      // 4: Only after successful Firestore persistence update local cache
      (db as any)[section] = updatedSectionData;
      saveDatabase(db);
      res.json({ success: true, section, data: updatedSectionData });
    } catch (err) {
      console.error('Error updating section:', err);
      res.status(500).json({ error: 'Failed to persist update to database' });
    }
  });

  // Firebase Info Endpoint (Admin protected, uses process.env.FIREBASE_DATABASE_ID)
  app.get('/api/firebase/info', requireAdmin, (req, res) => {
    try {
      const fsDb = getServerFirestore();
      res.json({
        configured: !!process.env.FIREBASE_PROJECT_ID,
        connected: !!fsDb,
        databaseId: process.env.FIREBASE_DATABASE_ID || '(default)'
      });
    } catch {
      res.json({ configured: false, connected: false, databaseId: process.env.FIREBASE_DATABASE_ID || '(default)' });
    }
  });

  // Admin: Update entire database (Transactional: persists all required sections before saveDatabase)
  app.put('/api/content', requireAdmin, async (req, res) => {
    try {
      const updated = req.body;
      const sections = Object.keys(updated);
      
      // Persist all required sections first
      for (const section of sections) {
        if (section !== 'appointments' && section !== 'contactLeads' && (Array.isArray(updated[section]) || typeof updated[section] === 'object')) {
          await syncSectionToFirestore(section, updated[section]);
        }
      }
      
      // Only after every required Firestore operation succeeds: saveDatabase
      saveDatabase(updated);
      
      res.json({ success: true, message: 'All content updated and synced to Firestore successfully' });
    } catch (err) {
      console.error('Error updating full content:', err);
      res.status(500).json({ error: 'Failed to persist full content update' });
    }
  });

  // Public: Create Appointment (Awaits persistence)
  app.post('/api/appointments', rateLimiter(10, 10 * 60 * 1000), async (req, res) => {
    try {
      const { patientName, phone, age, gender, concern, preferredDate, preferredTime, message, status, notes } = req.body;

      if (status !== undefined || notes !== undefined) {
        return res.status(400).json({ error: 'Unauthorized payload fields' });
      }

      if (!patientName || typeof patientName !== 'string' || patientName.trim().length === 0 || patientName.length > 100) {
        return res.status(400).json({ error: 'Valid patient name is required (max 100 chars)' });
      }
      if (!phone || typeof phone !== 'string' || phone.trim().length < 5 || phone.length > 25) {
        return res.status(400).json({ error: 'Valid phone number is required' });
      }
      if (!preferredDate || typeof preferredDate !== 'string' || preferredDate.length > 50) {
        return res.status(400).json({ error: 'Preferred date is required' });
      }
      if (!concern || typeof concern !== 'string' || concern.trim().length === 0 || concern.length > 500) {
        return res.status(400).json({ error: 'Medical concern is required (max 500 chars)' });
      }

      const appointment = await addAppointment({
        patientName: patientName.trim(),
        phone: phone.trim(),
        age: age ? String(age).slice(0, 15) : 'Not specified',
        gender: gender ? String(gender).slice(0, 25) : 'Unspecified',
        concern: concern.trim(),
        preferredDate,
        preferredTime: preferredTime ? String(preferredTime).slice(0, 50) : 'Flexible',
        message: message ? String(message).trim().slice(0, 1000) : ''
      });

      res.status(201).json({
        success: true,
        message: 'Thank you. Your appointment request has been received. Our team will contact you shortly.',
        appointment
      });
    } catch (err) {
      console.error('Appointment creation error:', err);
      res.status(500).json({ error: 'Failed to persist appointment request' });
    }
  });

  app.get('/api/appointments', requireAdmin, async (req, res) => {
    try {
      const db = await getDatabaseAsync();
      const { status, search, exportType } = req.query;

      let list = [...db.appointments];

      if (status && status !== 'All') {
        list = list.filter((a) => a.status.toLowerCase() === (status as string).toLowerCase());
      }

      if (search) {
        const query = (search as string).toLowerCase();
        list = list.filter(
          (a) =>
            a.patientName.toLowerCase().includes(query) ||
            a.phone.toLowerCase().includes(query) ||
            a.concern.toLowerCase().includes(query)
        );
      }

      if (exportType === 'csv') {
        const headers = ['ID,Patient Name,Phone,Age,Gender,Concern,Preferred Date,Preferred Time,Status,Submitted At,Notes'];
        const rows = list.map((a) => {
          return `"${a.id}","${a.patientName.replace(/"/g, '""')}","${a.phone}","${a.age}","${a.gender || ''}","${(a.concern || '').replace(/"/g, '""')}","${a.preferredDate}","${a.preferredTime}","${a.status}","${a.submittedAt}","${(a.notes || '').replace(/"/g, '""')}"`;
        });
        const csv = [headers, ...rows].join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="appointments-dr-puneet.csv"');
        return res.send(csv);
      }

      res.json(list);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  });

  // Admin: Update Appointment Status & Notes (Awaits persistence, strict field whitelist)
  app.patch('/api/appointments/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes, preferredDate, preferredTime } = req.body;
      const updates: any = {};
      if (status !== undefined) updates.status = String(status).slice(0, 30);
      if (notes !== undefined) updates.notes = String(notes).slice(0, 1000);
      if (preferredDate !== undefined) updates.preferredDate = String(preferredDate).slice(0, 50);
      if (preferredTime !== undefined) updates.preferredTime = String(preferredTime).slice(0, 50);

      const updated = await updateAppointment(id, updates);
      if (!updated) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json({ success: true, appointment: updated });
    } catch (err) {
      console.error('Appointment patch error:', err);
      res.status(500).json({ error: 'Failed to persist appointment update' });
    }
  });

  // Admin: Delete Appointment (Awaits persistence)
  app.delete('/api/appointments/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await deleteAppointment(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json({ success: true, message: 'Appointment deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to persist appointment deletion' });
    }
  });

  // Public: Submit Contact Lead (Awaits persistence)
  app.post('/api/contact-leads', rateLimiter(10, 10 * 60 * 1000), async (req, res) => {
    try {
      const { name, phone, email, subject, message, status, notes } = req.body;

      if (status !== undefined || notes !== undefined) {
        return res.status(400).json({ error: 'Unauthorized payload fields' });
      }

      if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
        return res.status(400).json({ error: 'Name is required' });
      }
      if (!phone || typeof phone !== 'string' || phone.trim().length < 5 || phone.length > 25) {
        return res.status(400).json({ error: 'Phone number is required' });
      }
      if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 2000) {
        return res.status(400).json({ error: 'Message is required (max 2000 chars)' });
      }
      if (email && (typeof email !== 'string' || email.length > 120)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      const lead = await addContactLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : undefined,
        subject: subject ? String(subject).trim().slice(0, 150) : 'Website General Inquiry',
        message: message.trim()
      });

      res.status(201).json({
        success: true,
        message: 'Thank you for contacting Dr. Puneet Kumar Clinic. We will respond promptly.',
        lead
      });
    } catch (err) {
      console.error('Contact lead error:', err);
      res.status(500).json({ error: 'Failed to persist contact inquiry' });
    }
  });

  // Testimonials Public Submission (Transactional: Awaits Firestore persistence before mutating cache)
  app.post('/api/testimonials', rateLimiter(10, 10 * 60 * 1000), async (req, res) => {
    try {
      const { patientName, treatmentCategory, location, rating, review, isPublished, order } = req.body;
      
      if (isPublished !== undefined || order !== undefined) {
        return res.status(400).json({ error: 'Unauthorized payload fields' });
      }

      if (!patientName || typeof patientName !== 'string' || patientName.trim().length === 0 || patientName.length > 100) {
        return res.status(400).json({ error: 'Patient name is required' });
      }
      if (!review || typeof review !== 'string' || review.trim().length === 0 || review.length > 1000) {
        return res.status(400).json({ error: 'Review is required (max 1000 chars)' });
      }
      const numRating = Number(rating);
      if (isNaN(numRating) || numRating < 1 || numRating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
      }

      const db = await getDatabaseAsync();
      
      const newTestimonial = {
        id: `test-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        patientName: patientName.trim(),
        treatmentCategory: treatmentCategory ? String(treatmentCategory).trim().slice(0, 60) : 'General Consultation',
        location: location ? String(location).trim().slice(0, 50) : 'Mohali',
        rating: numRating,
        review: review.trim(),
        isPublished: false,
        order: db.testimonials.length > 0 ? Math.max(...db.testimonials.map(t => t.order || 0)) + 1 : 1
      };

      const updatedTestimonials = [newTestimonial, ...(db.testimonials || [])];
      // Await syncSectionToFirestore first
      await syncSectionToFirestore('testimonials', updatedTestimonials);

      // Only after success assign to local cache and call saveDatabase
      db.testimonials = updatedTestimonials;
      saveDatabase(db);

      res.status(201).json({
        success: true,
        message: 'Thank you! Your testimonial has been submitted and is pending review.',
        testimonial: newTestimonial
      });
    } catch (err) {
      console.error('Error submitting testimonial:', err);
      res.status(500).json({ error: 'Failed to persist testimonial' });
    }
  });

  app.get('/api/contact-leads', requireAdmin, async (req, res) => {
    const db = await getDatabaseAsync();
    res.json(db.contactLeads);
  });

  // Admin: Update Contact Lead (Awaits persistence, strict field whitelist)
  app.patch('/api/contact-leads/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      const updates: any = {};
      if (status !== undefined) updates.status = String(status).slice(0, 30);
      if (notes !== undefined) updates.notes = String(notes).slice(0, 1000);

      const updated = await updateContactLead(id, updates);
      if (!updated) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      res.json({ success: true, lead: updated });
    } catch (err) {
      console.error('Contact lead patch error:', err);
      res.status(500).json({ error: 'Failed to persist lead update' });
    }
  });

  app.delete('/api/contact-leads/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await deleteContactLead(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      res.json({ success: true, message: 'Lead deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to persist lead deletion' });
    }
  });

  app.get('/api/media', async (req, res) => {
    const db = await getDatabaseAsync();
    res.json(db.media || []);
  });

  app.post('/api/media', requireAdmin, async (req, res) => {
    try {
      const { name, url, category, altText, size } = req.body;
      if (!name || !url) {
        return res.status(400).json({ error: 'Name and URL are required' });
      }

      const item = await addMediaItem({
        name,
        url,
        category: category || 'General',
        altText: altText || name,
        size: size || 'Unknown'
      });

      res.status(201).json({ success: true, media: item });
    } catch (err) {
      res.status(500).json({ error: 'Failed to persist media item' });
    }
  });

  app.delete('/api/media/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await deleteMediaItem(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Media not found' });
      }
      res.json({ success: true, message: 'Media removed' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to persist media deletion' });
    }
  });

  app.get('/sitemap.xml', (req, res) => {
    const db = getDatabase();
    const baseUrl = 'https://drpuneetkumar.com';
    const staticPages = [
      '',
      '/about',
      '/treatments',
      '/diabetes-care',
      '/patient-resources',
      '/videos',
      '/blog',
      '/testimonials',
      '/contact',
      '/book-appointment'
    ];

    const treatmentPages = db.treatments.map((t) => `/treatments/${t.slug}`);
    const blogPages = db.blogs.map((b) => `/blog/${b.slug}`);

    const allUrls = [...staticPages, ...treatmentPages, ...blogPages];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '' ? '1.0' : url.startsWith('/treatments') || url === '/diabetes-care' ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.send(xml);
  });

  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: https://drpuneetkumar.com/sitemap.xml`);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Dr. Puneet Kumar Clinic Web Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

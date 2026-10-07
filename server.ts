import express, { Request, Response } from 'express';
import path from 'path';
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
  const PORT = 3000;

  // Initialize and hydrate database from Firestore on startup
  await initializeDatabase();

  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Request logger
  app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.url}`);
    }
    next();
  });

  // Simple token-based admin authentication
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'doctor@puneet2026';
  const ADMIN_SECRET_TOKEN = 'dr-puneet-secure-token-2026-auth';

  const requireAdmin = (req: Request, res: Response, next: () => void) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Admin authentication required' });
    }
    const token = authHeader.split(' ')[1];
    if (token !== ADMIN_SECRET_TOKEN) {
      return res.status(403).json({ error: 'Forbidden: Invalid admin token' });
    }
    next();
  };

  // --- API Routes ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), doctor: 'Dr. Puneet Kumar' });
  });

  // Admin Login
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if ((username === ADMIN_USERNAME || username === 'drpuneet') && password === ADMIN_PASSWORD) {
      return res.json({
        success: true,
        token: ADMIN_SECRET_TOKEN,
        user: {
          username: ADMIN_USERNAME,
          role: 'Administrator',
          name: 'Dr. Puneet Kumar'
        }
      });
    }
    return res.status(401).json({ error: 'Invalid username or password' });
  });

  // Admin Verify Token
  app.get('/api/admin/verify', requireAdmin, (req, res) => {
    res.json({ valid: true, user: { username: ADMIN_USERNAME, role: 'Administrator' } });
  });

  // Public: Get all content
  app.get('/api/content', async (req, res) => {
    try {
      const data = await getDatabaseAsync();
      // Prevent browser caching of dynamic content
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.json(data);
    } catch (err) {
      console.error('Error fetching content:', err);
      res.status(500).json({ error: 'Failed to fetch content' });
    }
  });

  // Admin: Update content section
  app.put('/api/content/:section', requireAdmin, async (req, res) => {
    try {
      let section = req.params.section as string;
      if (section === 'heroSection') section = 'hero';
      if (section === 'mediaAssets') section = 'media';
      const db = await getDatabaseAsync();

      if (!(section in db)) {
        return res.status(400).json({ error: `Section '${section}' does not exist` });
      }

      (db as any)[section] = req.body;
      saveDatabase(db);
      syncSectionToFirestore(section, (db as any)[section]).catch(() => {});
      res.json({ success: true, section, data: (db as any)[section] });
    } catch (err) {
      console.error('Error updating section:', err);
      res.status(500).json({ error: 'Failed to update section' });
    }
  });

  // Firebase Database Info & Connectivity
  app.get('/api/firebase/info', (req, res) => {
    try {
      const fsDb = getServerFirestore();
      res.json({
        configured: true,
        projectId: 'spheric-transit-098sv',
        databaseId: 'ai-studio-drpuneetkumarsen-05cd4290-e916-4ed9-9b98-9ed263c1c298',
        connected: !!fsDb
      });
    } catch {
      res.json({ configured: false, connected: false });
    }
  });

  // Admin: Update entire database
  app.put('/api/content', requireAdmin, async (req, res) => {
    try {
      const updated = req.body;
      saveDatabase(updated);
      
      // Sync all major sections to Firestore
      const sections = Object.keys(updated);
      for (const section of sections) {
        if (Array.isArray(updated[section]) || typeof updated[section] === 'object') {
          await syncSectionToFirestore(section, updated[section]);
        }
      }
      
      res.json({ success: true, message: 'All content updated and synced to Firestore successfully' });
    } catch (err) {
      console.error('Error updating full content:', err);
      res.status(500).json({ error: 'Failed to update content' });
    }
  });

  // Public: Create Appointment
  app.post('/api/appointments', (req, res) => {
    try {
      const { patientName, phone, age, gender, concern, preferredDate, preferredTime, message } = req.body;

      if (!patientName || !patientName.trim()) {
        return res.status(400).json({ error: 'Patient name is required' });
      }
      if (!phone || !phone.trim()) {
        return res.status(400).json({ error: 'Phone number is required' });
      }
      if (!preferredDate) {
        return res.status(400).json({ error: 'Preferred date is required' });
      }
      if (!concern || !concern.trim()) {
        return res.status(400).json({ error: 'Medical concern is required' });
      }

      const appointment = addAppointment({
        patientName: patientName.trim(),
        phone: phone.trim(),
        age: age ? age.toString() : 'Not specified',
        gender: gender || 'Unspecified',
        concern: concern.trim(),
        preferredDate,
        preferredTime: preferredTime || 'Flexible',
        message: message ? message.trim() : ''
      });

      res.status(201).json({
        success: true,
        message: 'Thank you. Your appointment request has been received. Our team will contact you shortly.',
        appointment
      });
    } catch (err) {
      console.error('Appointment creation error:', err);
      res.status(500).json({ error: 'Failed to create appointment request' });
    }
  });

  // Admin: Get Appointments with search, filter, CSV export
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

      // Handle CSV export
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

  // Admin: Update Appointment Status & Notes
  app.patch('/api/appointments/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const updated = updateAppointment(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ success: true, appointment: updated });
  });

  // Admin: Delete Appointment
  app.delete('/api/appointments/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const deleted = deleteAppointment(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ success: true, message: 'Appointment deleted' });
  });

  // Public: Submit Contact Lead
  app.post('/api/contact-leads', (req, res) => {
    try {
      const { name, phone, email, subject, message } = req.body;
      if (!name || !phone || !message) {
        return res.status(400).json({ error: 'Name, phone number, and message are required' });
      }

      const lead = addContactLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : undefined,
        subject: subject ? subject.trim() : 'Website General Inquiry',
        message: message.trim()
      });

      res.status(201).json({
        success: true,
        message: 'Thank you for contacting Dr. Puneet Kumar Clinic. We will respond promptly.',
        lead
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to submit contact message' });
    }
  });

  // Testimonials Public Submission Endpoint
  app.post('/api/testimonials', (req, res) => {
    try {
      const { patientName, treatmentCategory, location, rating, review } = req.body;
      
      if (!patientName || !review) {
        return res.status(400).json({ error: 'Patient name and review are required' });
      }

      const db = getDatabase();
      
      const newTestimonial = {
        id: `test-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        patientName: patientName.trim(),
        treatmentCategory: treatmentCategory?.trim() || 'General Consultation',
        location: location?.trim() || 'Mohali',
        rating: Number(rating) || 5,
        review: review.trim(),
        isPublished: false, // Default to false for moderation
        order: db.testimonials.length > 0 ? Math.max(...db.testimonials.map(t => t.order || 0)) + 1 : 1
      };

      // Add to beginning of array
      db.testimonials = [newTestimonial, ...db.testimonials];
      saveDatabase(db);
      
      // Sync to Firebase
      syncSectionToFirestore('testimonials', db.testimonials).catch(() => {});

      res.status(201).json({
        success: true,
        message: 'Thank you! Your testimonial has been submitted and is pending review.',
        testimonial: newTestimonial
      });
    } catch (err) {
      console.error('Error submitting testimonial:', err);
      res.status(500).json({ error: 'Failed to submit testimonial' });
    }
  });

  // Admin: Get Contact Leads
  app.get('/api/contact-leads', requireAdmin, async (req, res) => {
    const db = await getDatabaseAsync();
    res.json(db.contactLeads);
  });

  // Admin: Update Contact Lead
  app.patch('/api/contact-leads/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const updated = updateContactLead(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ success: true, lead: updated });
  });

  // Admin: Delete Contact Lead
  app.delete('/api/contact-leads/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const deleted = deleteContactLead(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead deleted' });
  });

  // Media Library
  app.get('/api/media', async (req, res) => {
    const db = await getDatabaseAsync();
    res.json(db.media || []);
  });

  app.post('/api/media', requireAdmin, (req, res) => {
    try {
      const { name, url, category, altText, size } = req.body;
      if (!name || !url) {
        return res.status(400).json({ error: 'Name and URL are required' });
      }

      const item = addMediaItem({
        name,
        url,
        category: category || 'General',
        altText: altText || name,
        size: size || 'Unknown'
      });

      res.status(201).json({ success: true, media: item });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save media item' });
    }
  });

  app.delete('/api/media/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    const deleted = deleteMediaItem(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Media not found' });
    }
    res.json({ success: true, message: 'Media removed' });
  });

  // Dynamic Sitemap & Robots
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

  // Vite middleware setup
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
    console.log(`[Dr. Puneet Kumar Clinic Web Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

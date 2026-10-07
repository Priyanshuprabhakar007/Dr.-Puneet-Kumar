import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SiteProvider, useSite } from './context/SiteContext';

// Common Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppFloat } from './components/common/WhatsAppFloat';
import { MobileActionBar } from './components/common/MobileActionBar';
import { AppointmentModal } from './components/common/AppointmentModal';
import { Toast } from './components/common/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { TreatmentDetailPage } from './pages/TreatmentDetailPage';
import { DiabetesCarePage } from './pages/DiabetesCarePage';
import { PatientResourcesPage } from './pages/PatientResourcesPage';
import { VideosPage } from './pages/VideosPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { PrivacyPolicyPage, TermsPage, MedicalDisclaimerPage } from './pages/LegalPages';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppContent() {
  const { currentPath, data, navigate } = useSite();

  // Scroll to top upon route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Dynamic SEO Title & Meta Description updater
  useEffect(() => {
    // Keyboard shortcut for admin access (Ctrl+Shift+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        navigate('/admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  useEffect(() => {
    let title = data.seo?.siteTitle || `${data.doctorProfile?.name || 'Dr. Puneet Kumar'} | ${data.doctorProfile?.designation || 'Senior Physician'}`;
    let description = data.seo?.metaDescription || data.doctorProfile?.shortBio || '';

    if (currentPath === '/about') {
      title = `About ${data.doctorProfile?.name || 'Dr. Puneet Kumar'} | Qualifications & Medical Career`;
    } else if (currentPath === '/treatments') {
      title = `Treatments & Medical Specialties | ${data.doctorProfile?.name || 'Dr. Puneet Kumar'}`;
    } else if (currentPath.startsWith('/treatments/')) {
      const slug = currentPath.replace('/treatments/', '');
      const item = data.treatments?.find((t) => t.slug === slug);
      if (item) {
        title = `${item.title} Specialist Care | ${data.doctorProfile?.name || 'Dr. Puneet Kumar'}`;
        description = item.shortDescription;
      }
    } else if (currentPath === '/diabetes-care') {
      title = `Comprehensive Diabetes Care & Sugar Reversal | ${data.doctorProfile?.name || 'Dr. Puneet Kumar'}`;
      description = `Personalized diabetes protocols, continuous glucose monitoring (CGM), insulin titration, and complication screening in Mohali.`;
    } else if (currentPath === '/patient-resources') {
      title = `Patient Education & Health Resources | ${data.doctorProfile?.name || 'Dr. Puneet Kumar'}`;
    } else if (currentPath === '/videos') {
      title = `Medical Video Guidance & Patient FAQs | ${data.doctorProfile?.name || 'Dr. Puneet Kumar'}`;
    } else if (currentPath === '/blog') {
      title = `Health & Diabetes Blog Articles | ${data.doctorProfile?.name || 'Dr. Puneet Kumar'}`;
    } else if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      const blog = data.blogs?.find((b) => b.slug === slug);
      if (blog) {
        title = `${blog.title} | ${data.doctorProfile?.name || 'Dr. Puneet Kumar'}`;
        description = blog.excerpt;
      }
    } else if (currentPath === '/testimonials') {
      title = `Patient Reviews & Verified Testimonials | ${data.doctorProfile?.name || 'Dr. Puneet Kumar'}`;
    } else if (currentPath === '/contact') {
      title = `Contact Clinic & Timings | ${data.doctorProfile?.name || 'Dr. Puneet Kumar'} Mohali`;
    } else if (currentPath === '/book-appointment') {
      title = `Book Doctor Appointment | ${data.doctorProfile?.name || 'Dr. Puneet Kumar'} Senior Physician`;
    } else if (currentPath.startsWith('/admin')) {
      title = `Admin Management Portal | ${data.doctorProfile?.name || 'Dr. Puneet Kumar'} Clinic`;
    }

    document.title = title;

    // Update meta description
    let metaDescEl = document.querySelector('meta[name="description"]');
    if (!metaDescEl) {
      metaDescEl = document.createElement('meta');
      metaDescEl.setAttribute('name', 'description');
      document.head.appendChild(metaDescEl);
    }
    metaDescEl.setAttribute('content', description);

    // Schema.org Physician Structured Data
    const schemaId = 'physician-structured-data';
    let scriptEl = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = schemaId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const physicianSchema = {
      '@context': 'https://schema.org',
      '@type': 'Physician',
      name: data.doctorProfile?.name || 'Dr. Puneet Kumar',
      description: data.doctorProfile?.shortBio || '',
      medicalSpecialty: ['GeneralPractice', 'Endocrine', 'InternalMedicine'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.settings?.primaryAddress || '',
        addressLocality: data.settings?.city || '',
        addressRegion: data.settings?.state || '',
        addressCountry: 'IN'
      },
      telephone: data.settings?.primaryPhone || '',
      priceRange: '₹₹',
      openingHours: data.settings?.consultationTimings || '',
      image: data.doctorProfile?.photoUrl || ''
    };

    scriptEl.textContent = JSON.stringify(physicianSchema);
  }, [currentPath, data]);

  // Route Dispatcher
  const renderRoute = () => {
    // Admin Route (dedicated dashboard layout)
    if (currentPath.startsWith('/admin')) {
      return <AdminPage />;
    }

    // Public Pages
    let pageComponent = <HomePage />;

    if (currentPath === '/' || currentPath === '') {
      pageComponent = <HomePage />;
    } else if (currentPath === '/about') {
      pageComponent = <AboutPage />;
    } else if (currentPath === '/treatments') {
      pageComponent = <TreatmentsPage />;
    } else if (currentPath.startsWith('/treatments/')) {
      pageComponent = <TreatmentDetailPage />;
    } else if (currentPath === '/diabetes-care') {
      pageComponent = <DiabetesCarePage />;
    } else if (currentPath === '/patient-resources') {
      pageComponent = <PatientResourcesPage />;
    } else if (currentPath === '/videos') {
      pageComponent = <VideosPage />;
    } else if (currentPath === '/blog') {
      pageComponent = <BlogListPage />;
    } else if (currentPath.startsWith('/blog/')) {
      pageComponent = <BlogPostPage />;
    } else if (currentPath === '/testimonials') {
      pageComponent = <TestimonialsPage />;
    } else if (currentPath === '/contact') {
      pageComponent = <ContactPage />;
    } else if (currentPath === '/book-appointment') {
      pageComponent = <BookAppointmentPage />;
    } else if (currentPath === '/privacy-policy') {
      pageComponent = <PrivacyPolicyPage />;
    } else if (currentPath === '/terms') {
      pageComponent = <TermsPage />;
    } else if (currentPath === '/medical-disclaimer') {
      pageComponent = <MedicalDisclaimerPage />;
    } else {
      pageComponent = <NotFoundPage />;
    }

    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-1 pb-16 md:pb-0 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'linear' }}
            >
              {pageComponent}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppFloat />
        <MobileActionBar />
        <AppointmentModal />
        <Toast />
      </div>
    );
  };

  return renderRoute();
}

export default function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}

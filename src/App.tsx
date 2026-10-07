import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
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
import { getSeoForPath } from './utils/seo';

function AppContent() {
  const { currentPath, data, navigate } = useSite();
  const shouldReduceMotion = useReducedMotion();

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
    const origin = window.location.origin;
    const seo = getSeoForPath(currentPath, data, origin);

    document.title = seo.title;

    // Helper to safely set meta tag without duplication
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set canonical tag
    const setCanonicalTag = (href: string) => {
      let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    setMetaTag('name', 'description', seo.description);
    setMetaTag('name', 'robots', seo.robots);
    setCanonicalTag(seo.canonicalUrl);

    setMetaTag('property', 'og:site_name', 'Dr. Puneet Kumar Clinic');
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.description);
    setMetaTag('property', 'og:url', seo.canonicalUrl);
    setMetaTag('property', 'og:type', seo.ogType);
    setMetaTag('property', 'og:image', seo.ogImage);

    setMetaTag('name', 'twitter:card', seo.twitterCard);
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.description);
    setMetaTag('name', 'twitter:image', seo.ogImage);

    // Schema.org Physician Structured Data
    const physicianSchemaId = 'physician-structured-data';
    let physicianScript = document.getElementById(physicianSchemaId) as HTMLScriptElement | null;
    if (!physicianScript) {
      physicianScript = document.createElement('script');
      physicianScript.id = physicianSchemaId;
      physicianScript.type = 'application/ld+json';
      document.head.appendChild(physicianScript);
    }

    const defaultImage = `${origin}/aggarwal-clinic-logo.png`;
    const physicianSchema: any = {
      '@context': 'https://schema.org',
      '@type': 'Physician',
      name: data.doctorProfile?.name || 'Dr. Puneet Kumar',
      description: 'Senior Physician & Diabetes Specialist in Mohali',
      medicalSpecialty: ['GeneralPractice', 'Endocrine', 'InternalMedicine'],
      url: `${origin}/`,
      image: defaultImage
    };

    if (data.settings?.primaryPhone) {
      physicianSchema.telephone = data.settings.primaryPhone;
    }

    if (data.settings?.primaryAddress) {
      physicianSchema.address = {
        '@type': 'PostalAddress',
        streetAddress: data.settings.primaryAddress,
        addressLocality: data.settings.city || 'Mohali',
        addressRegion: data.settings.state || 'Punjab',
        addressCountry: 'IN'
      };
    }

    physicianScript.textContent = JSON.stringify(physicianSchema);

    // Schema.org Breadcrumbs
    const breadcrumbsSchemaId = 'breadcrumbs-structured-data';
    let breadcrumbsScript = document.getElementById(breadcrumbsSchemaId) as HTMLScriptElement | null;
    if (seo.breadcrumbs && seo.breadcrumbs.length > 0) {
      if (!breadcrumbsScript) {
        breadcrumbsScript = document.createElement('script');
        breadcrumbsScript.id = breadcrumbsSchemaId;
        breadcrumbsScript.type = 'application/ld+json';
        document.head.appendChild(breadcrumbsScript);
      }
      const breadcrumbList = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: seo.breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.url
        }))
      };
      breadcrumbsScript.textContent = JSON.stringify(breadcrumbList);
    } else if (breadcrumbsScript) {
      breadcrumbsScript.remove();
    }

    // Schema.org Page Entity Structured Data (BlogPosting / MedicalWebPage)
    const entitySchemaId = 'page-entity-structured-data';
    let entityScript = document.getElementById(entitySchemaId) as HTMLScriptElement | null;
    const oldBlogScript = document.getElementById('blog-structured-data');
    if (oldBlogScript) oldBlogScript.remove();

    if (seo.schemaJson) {
      if (!entityScript) {
        entityScript = document.createElement('script');
        entityScript.id = entitySchemaId;
        entityScript.type = 'application/ld+json';
        document.head.appendChild(entityScript);
      }
      entityScript.textContent = JSON.stringify(seo.schemaJson);
    } else if (entityScript) {
      entityScript.remove();
    }
  }, [currentPath, data]);

  // Route Dispatcher
  const renderRoute = () => {
    // Admin Route (dedicated dashboard layout)
    if (currentPath === '/admin' || currentPath === '/admin/') {
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
              initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'linear' }}
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

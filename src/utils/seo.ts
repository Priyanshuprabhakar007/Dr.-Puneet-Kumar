import { AppData } from '../types';

export interface SeoMetadata {
  status: 200 | 404;
  isFound: boolean;
  title: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  ogType: 'website' | 'article';
  ogImage: string;
  twitterCard: 'summary' | 'summary_large_image';
  breadcrumbs?: { name: string; url: string }[] | null;
  schemaJson?: object | null;
}

export function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatW3CDate(dateStr?: string): string | null {
  if (!dateStr || !dateStr.trim()) return null;
  const parsed = Date.parse(dateStr.trim());
  if (isNaN(parsed)) return null;
  return new Date(parsed).toISOString().split('T')[0];
}

export function safeJsonLd(value: any): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

export function getPublicOrigin(configuredUrl?: string, reqHost?: string, reqProto?: string): string {
  if (configuredUrl && configuredUrl.trim()) {
    try {
      const parsed = new URL(configuredUrl.trim());
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return `${parsed.protocol}//${parsed.host}${parsed.pathname === '/' ? '' : parsed.pathname}`.replace(/\/+$/, '');
      }
    } catch {
      return configuredUrl.trim().replace(/\/+$/, '');
    }
  }
  if (reqHost) {
    const proto = (reqProto || 'http').split(',')[0].trim();
    return `${proto}://${reqHost}`.replace(/\/+$/, '');
  }
  return 'http://localhost:3000';
}

export function getSeoForPath(rawPath: string, db: AppData, origin: string): SeoMetadata {
  // Normalize path: strip query and hash, strip trailing slashes except for root
  const urlPath = rawPath.split('?')[0].split('#')[0];
  const cleanPath = urlPath === '/' ? '/' : urlPath.replace(/\/+$/, '');
  const defaultImage = `${origin}/aggarwal-clinic-logo.png`;

  // 1. Homepage
  if (cleanPath === '' || cleanPath === '/') {
    return {
      status: 200,
      isFound: true,
      title: 'Dr. Puneet Kumar | Senior Physician & Diabetes Specialist',
      description: 'Official website of Dr. Puneet Kumar, Senior Physician & Diabetes Specialist in Mohali. Evidence-based care for diabetes, hypertension, and internal medicine.',
      canonicalUrl: `${origin}/`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image'
    };
  }

  // 2. About Page
  if (cleanPath === '/about') {
    return {
      status: 200,
      isFound: true,
      title: 'About Dr. Puneet Kumar | Senior Physician Mohali',
      description: 'Learn about Dr. Puneet Kumar’s clinical expertise, medical background, qualifications, and patient-centered internal medicine practice in Mohali.',
      canonicalUrl: `${origin}/about`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'About', url: `${origin}/about` }
      ]
    };
  }

  // 3. Treatments List Page
  if (cleanPath === '/treatments') {
    return {
      status: 200,
      isFound: true,
      title: 'Treatments & Medical Specialties | Dr. Puneet Kumar',
      description: 'Evidence-based clinical treatments for Type 2 diabetes, high blood pressure, thyroid disorders, and acute illnesses in Mohali.',
      canonicalUrl: `${origin}/treatments`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Treatments', url: `${origin}/treatments` }
      ]
    };
  }

  // 4. Dynamic Treatment Detail Page
  if (cleanPath.startsWith('/treatments/')) {
    const slug = cleanPath.slice('/treatments/'.length);
    const treatment = db.treatments?.find(
      (t) => t.slug === slug && t.published !== false
    );

    if (treatment) {
      return {
        status: 200,
        isFound: true,
        title: `${treatment.title} Care | Dr. Puneet Kumar`,
        description: treatment.shortDescription || `Clinical management and personalized care protocol for ${treatment.title} by Senior Physician Dr. Puneet Kumar in Mohali.`,
        canonicalUrl: `${origin}/treatments/${treatment.slug}`,
        robots: 'index, follow',
        ogType: 'article',
        ogImage: defaultImage,
        twitterCard: 'summary_large_image',
        breadcrumbs: [
          { name: 'Home', url: `${origin}/` },
          { name: 'Treatments', url: `${origin}/treatments` },
          { name: treatment.title, url: `${origin}/treatments/${treatment.slug}` }
        ],
        schemaJson: {
          '@context': 'https://schema.org',
          '@type': 'MedicalWebPage',
          name: `${treatment.title} Care | Dr. Puneet Kumar`,
          description: treatment.shortDescription || `Clinical management and personalized care for ${treatment.title}.`,
          url: `${origin}/treatments/${treatment.slug}`,
          about: {
            '@type': 'MedicalCondition',
            name: treatment.title
          }
        }
      };
    }

    // Treatment not found or not published
    return {
      status: 404,
      isFound: false,
      title: 'Treatment Not Found | Dr. Puneet Kumar',
      description: 'The requested treatment guide or clinical condition could not be found.',
      canonicalUrl: `${origin}${cleanPath}`,
      robots: 'noindex, nofollow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image'
    };
  }

  // 5. Diabetes Care Page
  if (cleanPath === '/diabetes-care') {
    return {
      status: 200,
      isFound: true,
      title: 'Comprehensive Diabetes Care & Protocols | Dr. Puneet Kumar',
      description: 'Personalized protocols for blood sugar management, continuous glucose monitoring (CGM), insulin titration, and complication screening in Mohali.',
      canonicalUrl: `${origin}/diabetes-care`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Diabetes Care', url: `${origin}/diabetes-care` }
      ]
    };
  }

  // 6. Patient Resources Page
  if (cleanPath === '/patient-resources') {
    return {
      status: 200,
      isFound: true,
      title: 'Patient Education & Health Resources | Dr. Puneet Kumar',
      description: 'Practical medical resources, self-monitoring guidance, and educational materials for diabetes and metabolic wellness by Dr. Puneet Kumar.',
      canonicalUrl: `${origin}/patient-resources`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Patient Resources', url: `${origin}/patient-resources` }
      ]
    };
  }

  // 7. Videos Page
  if (cleanPath === '/videos') {
    return {
      status: 200,
      isFound: true,
      title: 'Medical Videos & Patient Guidance | Dr. Puneet Kumar',
      description: 'Educational clinical videos and patient answers by Senior Physician Dr. Puneet Kumar on diabetes management, hypertension, and wellness.',
      canonicalUrl: `${origin}/videos`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Videos', url: `${origin}/videos` }
      ]
    };
  }

  // 8. Blog List Page
  if (cleanPath === '/blog') {
    return {
      status: 200,
      isFound: true,
      title: 'Health & Medical Blog | Dr. Puneet Kumar',
      description: 'Medical articles, clinical insights, and lifestyle advice on diabetes management, heart health, and preventive care by Dr. Puneet Kumar.',
      canonicalUrl: `${origin}/blog`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Blog', url: `${origin}/blog` }
      ]
    };
  }

  // 9. Dynamic Blog Post Page
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.slice('/blog/'.length);
    const blog = db.blogs?.find(
      (b) => b.slug === slug && b.published !== false && b.isPublished !== false
    );

    if (blog) {
      const blogImage =
        blog.featuredImage && blog.featuredImage.startsWith('http')
          ? blog.featuredImage
          : `${origin}${blog.featuredImage || '/aggarwal-clinic-logo.png'}`;

      const publishedIso = formatW3CDate(blog.publishedAt || blog.publishDate);

      return {
        status: 200,
        isFound: true,
        title: `${blog.title} | Dr. Puneet Kumar`,
        description: blog.excerpt || `Health article and physician advice on ${blog.title} by Dr. Puneet Kumar.`,
        canonicalUrl: `${origin}/blog/${blog.slug}`,
        robots: 'index, follow',
        ogType: 'article',
        ogImage: blogImage,
        twitterCard: 'summary_large_image',
        breadcrumbs: [
          { name: 'Home', url: `${origin}/` },
          { name: 'Blog', url: `${origin}/blog` },
          { name: blog.title, url: `${origin}/blog/${blog.slug}` }
        ],
        schemaJson: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: blog.title,
          description: blog.excerpt,
          image: blogImage,
          ...(publishedIso ? { datePublished: publishedIso, dateModified: publishedIso } : {}),
          author: {
            '@type': 'Person',
            name: db.doctorProfile?.name || 'Dr. Puneet Kumar'
          },
          publisher: {
            '@type': 'MedicalOrganization',
            name: 'Dr. Puneet Kumar Clinic',
            logo: {
              '@type': 'ImageObject',
              url: defaultImage
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${origin}/blog/${blog.slug}`
          }
        }
      };
    }

    // Blog not found or not published
    return {
      status: 404,
      isFound: false,
      title: 'Article Not Found | Dr. Puneet Kumar',
      description: 'The requested health blog article could not be found.',
      canonicalUrl: `${origin}${cleanPath}`,
      robots: 'noindex, nofollow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image'
    };
  }

  // 10. Testimonials Page
  if (cleanPath === '/testimonials') {
    return {
      status: 200,
      isFound: true,
      title: 'Patient Reviews & Experiences | Dr. Puneet Kumar',
      description: 'Read patient feedback and consultation experiences shared about care with Dr. Puneet Kumar.',
      canonicalUrl: `${origin}/testimonials`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Testimonials', url: `${origin}/testimonials` }
      ]
    };
  }

  // 11. Contact Page
  if (cleanPath === '/contact') {
    return {
      status: 200,
      isFound: true,
      title: 'Contact Clinic & Timings | Dr. Puneet Kumar Mohali',
      description: "Contact Dr. Puneet Kumar's clinic for consultation timings, appointment information and directions in Mohali.",
      canonicalUrl: `${origin}/contact`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Contact', url: `${origin}/contact` }
      ]
    };
  }

  // 12. Book Appointment Page
  if (cleanPath === '/book-appointment') {
    return {
      status: 200,
      isFound: true,
      title: 'Book Doctor Appointment | Dr. Puneet Kumar Mohali',
      description: 'Request an appointment with Dr. Puneet Kumar for an in-person medical consultation in Mohali.',
      canonicalUrl: `${origin}/book-appointment`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Book Appointment', url: `${origin}/book-appointment` }
      ]
    };
  }

  // 13. Legal Pages
  if (cleanPath === '/privacy-policy') {
    return {
      status: 200,
      isFound: true,
      title: 'Privacy Policy | Dr. Puneet Kumar Clinic',
      description: 'Official patient confidentiality and medical record privacy guidelines for Dr. Puneet Kumar Clinic healthcare services.',
      canonicalUrl: `${origin}/privacy-policy`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Privacy Policy', url: `${origin}/privacy-policy` }
      ]
    };
  }

  if (cleanPath === '/terms') {
    return {
      status: 200,
      isFound: true,
      title: 'Terms of Service | Dr. Puneet Kumar Clinic',
      description: 'Terms and conditions for clinical consultations, appointment bookings, and website use for Dr. Puneet Kumar Clinic.',
      canonicalUrl: `${origin}/terms`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Terms of Service', url: `${origin}/terms` }
      ]
    };
  }

  if (cleanPath === '/medical-disclaimer') {
    return {
      status: 200,
      isFound: true,
      title: 'Medical Disclaimer | Dr. Puneet Kumar Clinic',
      description: 'Important medical advisory and clinical consultation terms: online content does not replace professional in-person medical diagnosis.',
      canonicalUrl: `${origin}/medical-disclaimer`,
      robots: 'index, follow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary_large_image',
      breadcrumbs: [
        { name: 'Home', url: `${origin}/` },
        { name: 'Medical Disclaimer', url: `${origin}/medical-disclaimer` }
      ]
    };
  }

  // 14. Admin Page (Exact /admin or /admin/)
  if (cleanPath === '/admin') {
    return {
      status: 200,
      isFound: true,
      title: 'Staff & Doctor Portal | Dr. Puneet Kumar Clinic',
      description: 'Restricted administrative management portal.',
      canonicalUrl: `${origin}/admin`,
      robots: 'noindex, nofollow',
      ogType: 'website',
      ogImage: defaultImage,
      twitterCard: 'summary'
    };
  }

  // 15. Catch-all: 404 Not Found (e.g. /admin-random, /admin/test, /invalid-page)
  return {
    status: 404,
    isFound: false,
    title: 'Page Not Found | Dr. Puneet Kumar',
    description: 'The requested page does not exist or has been moved.',
    canonicalUrl: `${origin}${cleanPath}`,
    robots: 'noindex, nofollow',
    ogType: 'website',
    ogImage: defaultImage,
    twitterCard: 'summary'
  };
}

export function buildInjectedHtml(html: string, seo: SeoMetadata, db: AppData, origin: string): string {
  const defaultImage = `${origin}/aggarwal-clinic-logo.png`;

  // Do NOT emit medical or site structured data on 404 or admin/noindex pages
  const isExcludedFromSchema = seo.status === 404 || seo.robots.includes('noindex');

  const scriptTags: string[] = [];

  if (!isExcludedFromSchema) {
    // 1. Physician Schema (conservative verified fields only: NO unverified telephone or postal address)
    const physicianSchema = {
      '@context': 'https://schema.org',
      '@type': 'Physician',
      name: db.doctorProfile?.name || 'Dr. Puneet Kumar',
      description: 'Senior Physician & Diabetes Specialist in Mohali',
      medicalSpecialty: ['GeneralPractice', 'Endocrine', 'InternalMedicine'],
      url: `${origin}/`,
      image: defaultImage
    };
    scriptTags.push(`<script type="application/ld+json" id="seo-physician-jsonld">${safeJsonLd(physicianSchema)}</script>`);

    // 2. WebSite Schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Dr. Puneet Kumar Clinic',
      url: `${origin}/`
    };
    scriptTags.push(`<script type="application/ld+json" id="seo-website-jsonld">${safeJsonLd(websiteSchema)}</script>`);

    // 3. BreadcrumbList Schema
    if (seo.breadcrumbs && seo.breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: seo.breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: b.name,
          item: b.url
        }))
      };
      scriptTags.push(`<script type="application/ld+json" id="seo-breadcrumb-jsonld">${safeJsonLd(breadcrumbSchema)}</script>`);
    }

    // 4. Page Entity Schema (BlogPosting / MedicalWebPage)
    if (seo.schemaJson) {
      scriptTags.push(`<script type="application/ld+json" id="seo-page-jsonld">${safeJsonLd(seo.schemaJson)}</script>`);
    }
  }

  const tags = [
    `<meta name="app-public-origin" content="${escapeHtml(origin)}" />`,
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
    `<link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`,
    `<meta property="og:site_name" content="Dr. Puneet Kumar Clinic" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}" />`,
    `<meta property="og:type" content="${escapeHtml(seo.ogType)}" />`,
    `<meta property="og:image" content="${escapeHtml(seo.ogImage)}" />`,
    `<meta name="twitter:card" content="${escapeHtml(seo.twitterCard)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.ogImage)}" />`,
    ...scriptTags
  ].join('\n    ');

  // Strip existing title, metadata, app-public-origin, and any ld+json scripts that will be replaced
  let modifiedHtml = html
    .replace(/<title>.*?<\/title>/gi, '')
    .replace(/<meta\s+name=["']app-public-origin["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']robots["'][^>]*>/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:title["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:description["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:url["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:type["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:image["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:site_name["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:card["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:title["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:description["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:image["'][^>]*>/gi, '')
    .replace(/<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

  // Inject right after <head>
  return modifiedHtml.replace(/<head>/i, `<head>\n    ${tags}`);
}

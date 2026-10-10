export interface SiteSettings {
  siteName: string;
  doctorName: string;
  title: string;
  tagline: string;
  primaryPhone: string;
  secondaryPhone?: string;
  whatsappNumber: string;
  email: string;
  primaryAddress: string;
  city: string;
  state: string;
  consultationTimings: string;
  emergencyNotice: string;
  registrationNumber: string;
}

export interface HeroSection {
  smallHeading: string;
  mainHeadline: string;
  supportingCopy: string;
  primaryButtonLabel: string;
  primaryButtonUrl: string;
  secondaryButtonLabel: string;
  secondaryButtonUrl: string;
  doctorPhotoUrl: string;
  experienceYears: string;
  specializationBadge: string;
  internalMedicineBadge: string;
  patientCareBadge: string;
}

export interface DoctorProfile {
  name: string;
  designation: string;
  shortBio: string;
  fullBio: string[];
  photoUrl: string;
  secondaryPhotoUrl?: string;
  degrees: string;
  experienceYears: number;
  patientsTreated: string;
  clinicalFocus: string[];
  philosophy: string;
}

export interface Qualification {
  id: string;
  degree: string;
  institution: string;
  year?: string;
  description: string;
  order: number;
}

export interface Experience {
  id: string;
  hospital: string;
  designation: string;
  duration: string;
  description: string;
  order: number;
  active: boolean;
}

export interface TreatmentCategory {
  id: string;
  name: string;
  order: number;
}

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  iconName: string;
  shortDescription: string;
  fullOverview?: string;
  fullDescription?: string;
  symptoms?: string[];
  causes?: string[];
  diagnosticApproach?: string[];
  diagnosticTests?: string[];
  treatmentProtocol?: string[];
  treatmentApproach?: string;
  whenToConsult?: string[];
  lifestyleRecommendations?: string[];
  faqs?: { question: string; answer: string }[];
  isFeaturedCondition?: boolean;
  published?: boolean;
  order?: number;
}

export interface DiabetesService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  keyHighlights: string[];
  order?: number;
}

export type AppointmentStatus = 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  age?: string;
  gender?: string;
  concern: string;
  preferredDate: string;
  preferredTime: string;
  clinicLocation?: string;
  message?: string;
  submittedAt?: string;
  createdAt?: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface ContactLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  submittedAt?: string;
  createdAt?: string;
  status: 'New' | 'Replied' | 'Responded' | 'Archived';
  notes?: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishDate?: string;
  publishedAt?: string;
  readTime?: string;
  readingTime?: string;
  featuredImage: string;
  excerpt: string;
  content: string;
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  tags?: string[];
  isFeatured?: boolean;
  isPublished?: boolean;
  published?: boolean;
}

export interface HealthVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  duration?: string;
  order: number;
}

export interface Testimonial {
  id: string;
  patientName: string;
  rating: number;
  review: string;
  treatmentCategory?: string;
  location?: string;
  photoUrl?: string;
  isPublished?: boolean;
  order?: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order?: number;
  published?: boolean;
}

export interface ClinicLocation {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  phone: string;
  whatsapp: string;
  email: string;
  timings: string;
  mapEmbedUrl: string;
  mapLink?: string;
  googleMapsUrl: string;
  latitude?: string;
  longitude?: string;
  isPrimary: boolean;
  order: number;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
}

export interface MediaItem {
  id: string;
  name?: string;
  title?: string;
  url: string;
  category: string;
  altText: string;
  uploadedAt?: string;
  createdAt?: string;
  size?: string;
}

export interface SeoSettings {
  siteTitle?: string;
  defaultTitle?: string;
  metaDescription?: string;
  defaultDescription?: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage: string;
  localKeywords?: string[];
  googleSiteVerification?: string;
}

export interface AppData {
  settings: SiteSettings;
  hero: HeroSection;
  doctorProfile: DoctorProfile;
  qualifications: Qualification[];
  experience: Experience[];
  treatmentCategories: TreatmentCategory[];
  treatments: Treatment[];
  diabetesServices: DiabetesService[];
  appointments: Appointment[];
  contactLeads: ContactLead[];
  blogs: Blog[];
  videos: HealthVideo[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  locations: ClinicLocation[];
  socialLinks: SocialLinks;
  media: MediaItem[];
  seo: SeoSettings;
}

// Aliases for seamless component interoperability
export type AppointmentItem = Appointment;
export type VideoItem = HealthVideo;
export type BlogPostItem = Blog;
export type TestimonialItem = Testimonial;
export type FaqItem = FAQ;
export type QualificationItem = Qualification;
export type ExperienceItem = Experience;
export type DiabetesServiceItem = DiabetesService;
export type TreatmentItem = Treatment;
export type MediaAsset = MediaItem;
export type HeroSectionData = HeroSection;

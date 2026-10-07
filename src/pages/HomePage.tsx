import React from 'react';
import { motion } from 'motion/react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustIndicators } from '../components/home/TrustIndicators';
import { AboutDoctor } from '../components/home/AboutDoctor';
import { DiabetesCareSection } from '../components/home/DiabetesCareSection';
import { TreatmentsSection } from '../components/home/TreatmentsSection';
import { ConditionFinder } from '../components/home/ConditionFinder';
import { WhyChooseDrPuneet } from '../components/home/WhyChooseDrPuneet';
import { ExperienceTimeline } from '../components/home/ExperienceTimeline';
import { QualificationsSection } from '../components/home/QualificationsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { HealthVideosSection } from '../components/home/HealthVideosSection';
import { LatestBlogsSection } from '../components/home/LatestBlogsSection';
import { FaqSection } from '../components/home/FaqSection';
import { AppointmentFormSection } from '../components/home/AppointmentFormSection';
import { LocationSection } from '../components/home/LocationSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

export const HomePage: React.FC = () => {
  return (
    <div className="">
      {/* 1. Hero Section (Includes Integrated Credentials Bar) */}
      <HeroSection />

      {/* 2. Trust Indicators */}
      <TrustIndicators />

      {/* 3. About Doctor & Philosophy */}
      <AboutDoctor />

      {/* 4. Specialized Diabetes Program */}
      <DiabetesCareSection />

      {/* 5. Clinical Conditions & Treatments Grid */}
      <TreatmentsSection />

      {/* 6. Interactive Symptom / Condition Finder */}
      <ConditionFinder />

      {/* 7. Why Choose Dr. Puneet */}
      <WhyChooseDrPuneet />

      {/* 8. Hospital Appointments & Clinical Experience */}
      <ExperienceTimeline />

      {/* 9. Degrees & Qualifications */}
      <QualificationsSection />

      {/* 10. Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />

      {/* 11. Patient Education Health Videos */}
      <HealthVideosSection />

      {/* 12. Latest Medical Insights & Articles */}
      <LatestBlogsSection />

      {/* 13. Patient FAQs */}
      <FaqSection />

      {/* 14. Dedicated In-Page Booking Form */}
      <AppointmentFormSection />

      {/* 15. Clinic Address & Google Maps Embed */}
      <LocationSection />

      {/* 16. Final Consultation CTA */}
      <FinalCtaSection />
    </div>
  );
};

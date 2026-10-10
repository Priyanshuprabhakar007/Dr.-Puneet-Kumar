import React from 'react';
import { motion } from 'motion/react';
import { AppointmentFormSection } from '../components/home/AppointmentFormSection';
import { LocationSection } from '../components/home/LocationSection';
import { FaqSection } from '../components/home/FaqSection';

export const BookAppointmentPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-blue-950 text-white py-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Schedule Doctor Consultation
          </h1>
          <p className="text-sm text-blue-200 mt-2">
            Dr. Puneet Kumar • Livasa Hospital: 10:00 AM – 5:00 PM | Aggarwal Clinic: 5:00 PM – 7:00 PM
          </p>
        </div>
      </div>

      <AppointmentFormSection />
      <LocationSection />
      <FaqSection />
    </div>
  );
};

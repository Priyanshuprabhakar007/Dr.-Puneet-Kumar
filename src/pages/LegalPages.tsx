import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { ShieldCheck, FileText, AlertTriangle } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { data } = useSite();

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-100 pb-6">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Legal Document</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Privacy Policy</h1>
          <p className="text-xs text-slate-500 mt-1">Last updated: January 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
          <p>
            At the clinic of <strong>{data.doctorProfile.name}</strong>, we hold patient confidentiality and personal medical information in the highest regard. This Privacy Policy sets out how we collect, store, and process patient information.
          </p>

          <h3 className="text-base font-bold text-slate-900 mt-4">1. Information We Collect</h3>
          <p>
            We collect personal details (name, phone number, age, gender) and medical history submitted voluntarily by you through our online consultation request forms, WhatsApp inquiries, or during your physical clinic visits.
          </p>

          <h3 className="text-base font-bold text-slate-900 mt-4">2. Use of Information</h3>
          <p>
            Your information is used strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Coordinate and confirm outpatient appointments.</li>
            <li>Maintain confidential medical clinical records under the Indian Medical Council Act.</li>
            <li>Deliver relevant health advisories or follow-up communication as requested by you.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-900 mt-4">3. Data Security</h3>
          <p>
            We enforce stringent digital and administrative safeguards. We will never sell, lease, or distribute your personal health data to third-party commercial vendors.
          </p>

          <h3 className="text-base font-bold text-slate-900 mt-4">4. Contact Information</h3>
          <p>
            If you have questions regarding your data privacy, please contact the clinic at: <br />
            <strong>Email:</strong> {data.settings.email} <br />
            <strong>Phone:</strong> {data.settings.primaryPhone}
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { data } = useSite();

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-100 pb-6">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Legal Document</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Terms of Use</h1>
          <p className="text-xs text-slate-500 mt-1">Last updated: January 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
          <p>
            By accessing or using this website, you agree to comply with and be bound by the following Terms of Use.
          </p>

          <h3 className="text-base font-bold text-slate-900 mt-4">1. Informational Purpose Only</h3>
          <p>
            The content provided on this website is intended solely for educational, informational, and appointment booking purposes. It does not establish a formal doctor-patient relationship until an in-person or official clinical consultation has occurred.
          </p>

          <h3 className="text-base font-bold text-slate-900 mt-4">2. Appointment Requests</h3>
          <p>
            Submitting an appointment request through this website represents an inquiry for clinical scheduling. All appointments are subject to final phone or WhatsApp verification and doctor availability.
          </p>

          <h3 className="text-base font-bold text-slate-900 mt-4">3. Intellectual Property</h3>
          <p>
            All text, photographs, graphics, videos, and articles are the intellectual property of Dr. Puneet Kumar and may not be reproduced without written permission.
          </p>
        </div>
      </div>
    </div>
  );
};

export const MedicalDisclaimerPage: React.FC = () => {
  const { data } = useSite();

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-100 pb-6">
          <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Clinical Notice</span>
          <h1 className="text-3xl font-bold text-slate-900 mt-1">Medical Disclaimer</h1>
          <p className="text-xs text-slate-500 mt-1">Mandatory Patient Notice</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-blue-900 text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p>
            <strong>Important Clinical Notice:</strong> The information contained on this website is not medical advice and must not be used to replace professional clinical examination or self-prescribe medication.
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
          <p>
            The health articles, videos, and treatment guidelines authored by <strong>{data.doctorProfile.name}</strong> are intended to promote patient health literacy. Every human body and clinical disease presents uniquely. Do not start, stop, or change the dosage of any prescribed medications (including insulin, oral anti-diabetic drugs, anti-hypertensives, or thyroid hormones) without direct physician supervision.
          </p>

          <h3 className="text-base font-bold text-slate-900 mt-4">Emergency Situations</h3>
          <p>
            If you believe you are experiencing a life-threatening medical emergency (such as sudden chest pain, severe breathlessness, stroke symptoms, loss of consciousness, or blood glucose levels below 60 mg/dL), call emergency emergency services immediately or report directly to the nearest hospital casualty/emergency room.
          </p>
        </div>
      </div>
    </div>
  );
};

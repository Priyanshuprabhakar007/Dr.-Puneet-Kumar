import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { data, submitContact, showToast } = useSite();
  const { settings, locations } = data;

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Medical Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const cleanWhatsApp = settings.whatsappNumber.replace(/[^0-9]/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!contactForm.name.trim() || !contactForm.phone.trim() || !contactForm.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitContact(contactForm);
      if (res.success) {
        setIsSuccess(true);
        showToast('Message sent! Clinic staff will contact you.', 'success');
        setContactForm({
          name: '',
          phone: '',
          email: '',
          subject: 'General Medical Inquiry',
          message: ''
        });
      } else {
        setErrorMsg(res.message);
      }
    } catch {
      setErrorMsg('Failed to send. Please call the clinic directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const primaryLoc = locations.find((l) => l.isPrimary) || locations[0];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-blue-100 text-blue-800 text-xs font-semibold">
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span>Clinic Reach & Consultation Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Dr. Puneet Kumar Clinic
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Have questions regarding consultation slots, follow-ups, or medical records? Connect with our clinic team at Livasa Hospital.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Desk</h4>
            <a
              href={`tel:${settings.primaryPhone}`}
              className="text-base font-bold text-slate-900 hover:text-blue-700 block"
            >
              {settings.primaryPhone}
            </a>
            <p className="text-[11px] text-slate-500">OPD Appointments & Queries</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">WhatsApp</h4>
            <a
              href={`https://wa.me/${cleanWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-bold text-slate-900 hover:text-green-700 block"
            >
              {settings.whatsappNumber}
            </a>
            <p className="text-[11px] text-slate-500">Quick chat & report sharing</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">OPD Hours</h4>
            <p className="text-xs font-bold text-slate-900">{settings.consultationTimings}</p>
            <p className="text-[11px] text-slate-500">Prior appointment recommended</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</h4>
            <p className="text-xs font-bold text-slate-900 leading-snug">{primaryLoc.address}</p>
            <p className="text-[11px] text-slate-500">SAS Nagar, Punjab</p>
          </div>
        </div>

        {/* Layout: Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Send a Message / Inquiry</h3>
            <p className="text-xs text-slate-500 mb-6">
              Our clinic receptionist will get back to you promptly during operating hours.
            </p>

            {isSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Inquiry Submitted</h4>
                <p className="text-xs text-slate-600">
                  Thank you. Your message has been sent to our desk.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-xs text-blue-700 underline font-semibold mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-2xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Balwinder Singh"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98140XXXXX"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white text-xs"
                  >
                    <option value="General Medical Inquiry">General Medical Inquiry</option>
                    <option value="Diabetes Consultation Query">Diabetes Consultation Query</option>
                    <option value="Prescription Refill / Follow-up">Prescription Refill / Follow-up</option>
                    <option value="Feedback / Suggestion">Feedback / Suggestion</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your query or message here..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Inquiry to Clinic'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-6 space-y-4">
            <div className="h-[420px] rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-100">
              <iframe
                src={primaryLoc.mapEmbedUrl}
                title="Clinic Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Emergency reminder banner */}
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
              <span className="font-bold uppercase text-[10px] bg-blue-200 text-blue-900 px-2 py-0.5 rounded shrink-0">
                Notice
              </span>
              <p className="leading-relaxed">
                For acute emergencies (chest pain, stroke, high fever with altered sensorium), please proceed immediately to the nearest hospital emergency department.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  ExternalLink,
  Building2,
  Navigation
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { data } = useSite();
  const { locations, settings } = data;

  const cleanWhatsApp = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/60" id="locations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-blue-100 text-blue-800 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Clinic Access & Consultation Timings</span>
          </div>
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-extrabold text-slate-900 tracking-tight">
            Visit Our Clinic in Mohali
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            Centrally located in Sector 71 (Livasa Hospital), Mohali with convenient parking, accessible elevator access, and on-site basic diagnostics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Location details card(s) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {(locations || []).map((loc, idx) => {
              // Construct Google Maps URL dynamically
              let getDirectionsUrl = loc.googleMapsUrl;
              if (!getDirectionsUrl) {
                if (loc.latitude && loc.longitude) {
                  getDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;
                } else {
                  getDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`;
                }
              }

              return (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", bounce: 0.25, duration: 0.9, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-2xl">
                      {loc.isPrimary ? 'Primary Clinic' : 'Consultation Center'}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-2">{loc.name}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-800">Address:</p>
                      <p className="leading-relaxed">{loc.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-800">OPD Timings:</p>
                      <p className="leading-relaxed text-xs sm:text-sm">{loc.timings}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-800">Phone Consultation / Desk:</p>
                      <a
                        href={`tel:${loc.phone}`}
                        className="text-blue-700 font-semibold hover:underline"
                      >
                        {loc.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-800">Direct Email:</p>
                      <a
                        href={`mailto:${settings.email}`}
                        className="text-slate-700 hover:text-blue-700"
                      >
                        {settings.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick actions for location */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <a
                    href={getDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-semibold transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-600" />
                    <span>Get Directions</span>
                  </a>
                  <a
                    href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent('Hello, I would like to visit the clinic in Sector 71.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-green-50 hover:bg-green-100 text-green-800 text-xs font-semibold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </motion.div>
              );
            })}
          </div>

          {/* Interactive Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.9 }}
            className="lg:col-span-7 h-full min-h-[360px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 relative"
          >
            {(() => {
              const primaryLoc = locations?.find(loc => loc.isPrimary) || locations?.[0];
              if (!primaryLoc) return null;

              // Generate embed URL
              let embedUrl = primaryLoc.mapEmbedUrl;
              if (!embedUrl) {
                if (primaryLoc.latitude && primaryLoc.longitude) {
                  embedUrl = `https://maps.google.com/maps?q=${primaryLoc.latitude},${primaryLoc.longitude}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
                } else {
                  embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(primaryLoc.address)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
                }
              }

              return (
                <>
                  <iframe
                    src={embedUrl}
                    title="Dr. Puneet Kumar Clinic Location Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '400px' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs px-4 py-2 rounded-2xl shadow-md border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2 max-w-[90%] sm:max-w-sm">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="truncate">{primaryLoc.address}</span>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

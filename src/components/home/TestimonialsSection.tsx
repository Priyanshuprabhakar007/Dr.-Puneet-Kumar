import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, MessageSquarePlus, X, Loader2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { data, submitTestimonial, showToast } = useSite();
  const { testimonials } = data;

  // Filter only published testimonials
  const published = (testimonials || [])
    .filter((t) => t.isPublished !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [form, setForm] = useState({
    patientName: '',
    treatmentCategory: '',
    location: '',
    rating: 5,
    review: ''
  });

  if (published.length === 0 && !isModalOpen) return null;

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? published.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === published.length - 1 ? 0 : prev + 1));
  };

  const current = published[currentIndex] || testimonials[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientName || !form.review) return;

    setIsSubmitting(true);
    try {
      await submitTestimonial(form);
      setIsModalOpen(false);
      setForm({
        patientName: '',
        treatmentCategory: '',
        location: '',
        rating: 5,
        review: ''
      });
      showToast('Thank you! Your testimonial has been submitted and is pending review.');
    } catch (err) {
      showToast('Failed to submit testimonial. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-[#f8fafc] overflow-hidden relative" id="testimonials">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-[1px] bg-blue-600" />
              <p className="text-blue-600 font-extrabold text-[11px] tracking-[0.3em] uppercase">Clinical Outcomes</p>
            </div>
            <h2 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black text-slate-900 leading-[0.9] tracking-tighter font-display">
              Patient<br />
              <span className="text-blue-600 italic font-serif font-light">Narratives.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed tracking-tight max-w-xl">
              Authentic recovery journeys and clinical outcomes shared by patients managed under Dr. Puneet Kumar's care.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-extrabold rounded-2xl transition-all active:scale-95 shadow-xl shadow-slate-900/10"
          >
            <MessageSquarePlus className="w-5 h-5" />
            <span>Share Your Journey</span>
          </button>
        </div>

        <div className="max-w-5xl mx-auto">
          {published.length > 0 ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white p-8 sm:p-12 lg:p-20 rounded-[3rem] sm:rounded-[4rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]"
            >
              <div className="absolute top-12 left-12 opacity-[0.03]">
                <Quote className="w-32 h-32 text-slate-900 rotate-180" />
              </div>
              
              <div className="relative z-10 space-y-12">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < current.rating ? 'text-blue-600 fill-blue-600' : 'text-slate-100 fill-slate-100'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-2xl sm:text-4xl text-slate-900 leading-[1.3] font-black tracking-tight font-display italic font-serif italic">
                  "{current.review}"
                </p>
                
                <div className="pt-12 border-t border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    {current.photoUrl ? (
                      <img
                        src={current.photoUrl}
                        alt={current.patientName}
                        className="w-16 h-16 rounded-full object-cover border-4 border-slate-50 shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 font-black flex items-center justify-center text-xl shadow-sm uppercase">
                        {current.patientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xl font-black text-slate-900 tracking-tight">{current.patientName}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
                          {current.treatmentCategory || 'General Consultation'}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          {current.location || 'Clinic Patient'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={prevTestimonial}
                      className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-500 shadow-sm"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-500 shadow-sm"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
      
      {/* Submit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 my-8 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-2xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Share Your Experience</h3>
              <p className="text-sm text-slate-500 mt-1">Your feedback helps others find the right care.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.patientName}
                  onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Treatment/Condition</label>
                  <input
                    type="text"
                    value={form.treatmentCategory}
                    onChange={(e) => setForm({ ...form, treatmentCategory: e.target.value })}
                    placeholder="e.g. Diabetes Care"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Mohali"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      className="p-1 cursor-pointer hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= form.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Your Review *</label>
                <textarea
                  required
                  rows={4}
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  placeholder="Share details of your experience, treatment, and recovery..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-70 text-white font-bold rounded-2xl transition-all shadow-md cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Testimonial'
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-3">
                  Testimonials are subject to review before being published.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

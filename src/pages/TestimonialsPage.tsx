import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { Star, CheckCircle2, Quote, Plus, X, Heart } from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { data, showToast, submitTestimonial } = useSite();
  const { testimonials } = data;

  const [filterCategory, setFilterCategory] = useState('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    patientName: '',
    rating: 5,
    review: '',
    treatmentCategory: 'Diabetes Care',
    location: 'Mohali'
  });

  const categories = ['All', 'Diabetes Care', 'Hypertension', 'Thyroid Care', 'General Medicine'];

  const published = testimonials.filter((t) => t.isPublished !== false);

  const filtered =
    filterCategory === 'All'
      ? published
      : published.filter(
          (t) =>
            t.treatmentCategory &&
            t.treatmentCategory.toLowerCase().includes(filterCategory.toLowerCase())
        );

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.patientName.trim() || !reviewForm.review.trim()) {
      showToast('Please fill all required fields.', 'error');
      return;
    }
    const res = await submitTestimonial(reviewForm);
    if (res.success) {
      showToast(res.message, 'success');
      setIsSubmitModalOpen(false);
      setReviewForm({
        patientName: '',
        rating: 5,
        review: '',
        treatmentCategory: 'Diabetes Care',
        location: 'Mohali'
      });
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-blue-100 text-blue-800 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500" />
            <span>Verified Patient Experiences</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Patient Stories & Testimonials
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Authentic experiences shared by patients treated for diabetes, high blood pressure, and chronic conditions by Dr. Puneet Kumar.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Share Your Recovery Story</span>
            </button>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < (item.rating || 5)
                            ? 'text-blue-400 fill-blue-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-blue-200" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                {item.photoUrl ? (
                  <img
                    src={item.photoUrl}
                    alt={item.patientName}
                    className="w-10 h-10 rounded-2xl object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                    {item.patientName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-slate-900 text-xs">{item.patientName}</h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {item.treatmentCategory || 'General Consultation'} • {item.location || 'Mohali'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Review Modal */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Share Your Experience</h3>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="p-1 rounded-2xl text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manpreet S."
                    value={reviewForm.patientName}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, patientName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Treatment Category</label>
                    <select
                      value={reviewForm.treatmentCategory}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, treatmentCategory: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
                    >
                      <option value="Diabetes Care">Diabetes Care</option>
                      <option value="Hypertension">Hypertension</option>
                      <option value="Thyroid Care">Thyroid Care</option>
                      <option value="Fever & Infection">Fever & Infection</option>
                      <option value="General Medicine">General Medicine</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Rating</label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, rating: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Feedback / Story *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share how Dr. Puneet's treatment helped manage your health..."
                    value={reviewForm.review}
                    onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-2xl text-xs transition-colors cursor-pointer"
                >
                  Submit Patient Feedback
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

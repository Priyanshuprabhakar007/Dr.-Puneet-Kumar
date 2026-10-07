import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { IconRenderer } from '../components/common/IconRenderer';
import { Search, Stethoscope, ArrowRight, CheckCircle2 } from 'lucide-react';

export const TreatmentsPage: React.FC = () => {
  const { data, navigate, openAppointmentModal } = useSite();
  const { treatmentCategories, treatments } = data;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTreatments = treatments.filter((t) => {
    if (t.published === false) return false;
    const matchesCategory = selectedCategory === 'all' || t.categoryId === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.symptoms?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-blue-100 text-blue-800 text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
            <span>Clinical Specialties & Therapeutics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Treatments & Medical Care Directory
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Explore our 8 specialized medical disciplines led by Dr. Puneet Kumar. Every protocol is grounded in evidence-based international clinical guidelines.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/80 mb-8 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by condition, disease, or symptom (e.g., HbA1c, fever, thyroid, BP, asthma)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          {/* Categories Horizontal */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories ({treatments.length})
            </button>
            {treatmentCategories.map((cat) => {
              const count = treatments.filter((t) => t.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Treatments Grid */}
        {filteredTreatments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No clinical conditions found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-bold text-blue-700 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTreatments.map((treatment) => {
              const catName =
                treatmentCategories.find((c) => c.id === treatment.categoryId)?.name || 'Medicine';

              return (
                <div
                  key={treatment.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white flex items-center justify-center transition-colors">
                        <IconRenderer name={treatment.iconName} className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-2xl">
                        {catName}
                      </span>
                    </div>

                    <h3
                      onClick={() => navigate(`/treatments/${treatment.slug}`)}
                      className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 cursor-pointer leading-snug"
                    >
                      {treatment.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {treatment.shortDescription}
                    </p>

                    {/* Symptoms preview */}
                    {treatment.symptoms && treatment.symptoms.length > 0 && (
                      <div className="space-y-1 mb-4">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                          Key Symptoms:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {treatment.symptoms.slice(0, 3).map((symp, i) => (
                            <span
                              key={i}
                              className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-2xl"
                            >
                              {symp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => navigate(`/treatments/${treatment.slug}`)}
                      className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Treatment Protocol</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => openAppointmentModal(`Treatment: ${treatment.title}`)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors cursor-pointer"
                    >
                      Consult
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

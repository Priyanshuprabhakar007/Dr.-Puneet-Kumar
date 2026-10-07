import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { data } = useSite();
  const { faqs } = data;
  
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<string[]>([]);

  const categories = ['All', 'General Consultation', 'Diabetes', 'Clinic Timings', 'Emergency'];

  const publishedFaqs = (faqs || [])
    .filter((f) => f.published !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const filteredFaqs =
    activeCategory === 'All'
      ? publishedFaqs
      : publishedFaqs.filter((f) => f.category.toLowerCase() === activeCategory.toLowerCase());

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-24 bg-[#f8fafc]" id="faq">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-3">
            <div className="w-8 h-[1px] bg-blue-600" />
            <p className="text-blue-600 font-extrabold text-[11px] tracking-[0.3em] uppercase">Knowledge Base</p>
            <div className="w-8 h-[1px] bg-blue-600" />
          </div>
          <h2 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black text-slate-900 leading-[0.9] tracking-tighter font-display">
            Your Health,<br />
            <span className="text-blue-600 italic font-serif font-light">Clarified.</span>
          </h2>
          <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed tracking-tight max-w-2xl mx-auto">
            Find answers to common clinical inquiries, metabolic health management protocols, and practice logistics.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-8 mb-12 scrollbar-none no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3.5 rounded-2xl text-xs font-black tracking-widest uppercase transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xl scale-105'
                  : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                key={faq.id}
                className={`group rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-blue-200 shadow-2xl shadow-blue-900/5' 
                    : 'bg-white/50 border-slate-100 hover:border-blue-100 hover:bg-white'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left px-10 py-8 flex items-center justify-between gap-6"
                >
                  <span className={`text-xl font-black tracking-tight transition-colors duration-500 ${isOpen ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-700'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-10 pb-10">
                    <div className="pt-6 border-t border-slate-50 space-y-4">
                      <p className="text-lg text-slate-500 font-medium leading-relaxed tracking-tight">
                        {faq.answer}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Clinical Pathway: {faq.category}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { ScrollReveal } from '../common/ScrollReveal';
import { BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';

export const LatestBlogsSection: React.FC = () => {
  const { data, navigate } = useSite();
  const { blogs } = data;

  const published = (blogs || [])
    .filter((b) => b.published !== false)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <section className="py-24 bg-white" id="blogs">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <ScrollReveal animation="stagger-container" className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-6 max-w-3xl">
            <ScrollReveal animation="stagger-item" className="inline-flex items-center gap-3">
              <div className="w-8 h-[1px] bg-blue-600" />
              <p className="text-blue-600 font-extrabold text-[11px] tracking-[0.3em] uppercase">Clinical Journal</p>
            </ScrollReveal>
            <ScrollReveal animation="stagger-item">
              <h2 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black text-slate-900 leading-[0.9] tracking-tighter font-display">
                Latest Health<br />
                <span className="text-blue-600 italic font-serif font-light">Insights.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="stagger-item">
              <p className="text-xl text-slate-500 font-medium leading-relaxed tracking-tight max-w-xl">
                Stay informed with physician-authored articles on metabolic health, nutrition, and advanced medical diagnostics.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="stagger-item">
            <button
              onClick={() => navigate('/blog')}
              className="group flex items-center gap-3 px-10 py-5 bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-900 font-extrabold rounded-2xl transition-all active:scale-95 shadow-sm"
            >
              <span>Explore All Publications</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </ScrollReveal>
        </ScrollReveal>

        <ScrollReveal animation="stagger-container" staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {published.map((post, idx) => (
            <ScrollReveal key={post.id} animation="stagger-item" className="h-full">
              <article
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="group h-full flex flex-col bg-[#f8fafc] rounded-[2.5rem] overflow-hidden border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 cursor-pointer"
              >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-10 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-blue-700 transition-colors font-display">
                    {post.title}
                  </h3>
                  <p className="text-base text-slate-500 font-medium leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                      PK
                    </div>
                    <span className="text-xs font-black text-slate-900 tracking-tight">Dr. Puneet Kumar</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
              </article>
            </ScrollReveal>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};

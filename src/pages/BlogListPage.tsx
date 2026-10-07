import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { BookOpen, Clock, Calendar, ArrowRight, Search, User } from 'lucide-react';

export const BlogListPage: React.FC = () => {
  const { data, navigate } = useSite();
  const { blogs } = data;

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Diabetes',
    'Hypertension',
    'General Health',
    'Preventive Health',
    'Seasonal Illness'
  ];

  const filteredBlogs = blogs.filter((b) => {
    if (b.published === false) return false;
    const matchesCat =
      selectedCategory === 'All' || b.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      search === '' ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-blue-100 text-blue-800 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Physician Editorial Archive</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Patient Education & Medical Articles
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Written by Dr. Puneet Kumar to educate patients and families on long-term disease management, early warning signs, and evidence-based living.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search medical articles by keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              onClick={() => navigate(`/blog/${blog.slug}`)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-3 left-3 bg-blue-700 text-white text-[11px] font-semibold px-2.5 py-1 rounded-2xl shadow-xs">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {blog.readingTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug mb-2.5">
                    {blog.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                <span className="text-slate-500 font-medium">By {blog.author}</span>
                <span className="font-bold text-blue-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

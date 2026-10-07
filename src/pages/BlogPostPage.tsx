import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  ArrowLeft,
  Share2,
  Bookmark,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export const BlogPostPage: React.FC<{ slug?: string }> = ({ slug: propSlug }) => {
  const { data, currentPath, navigate, openAppointmentModal, showToast } = useSite();
  const { blogs, doctorProfile } = data;

  const activeSlug = propSlug || currentPath.replace('/blog/', '').trim();
  const post = blogs.find((b) => b.slug === activeSlug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 py-20 px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Article Not Found</h2>
          <p className="text-sm text-slate-600 mb-6">
            The requested medical blog article does not exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-2.5 bg-blue-700 text-white rounded-2xl text-xs font-semibold"
          >
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'success');
    }
  };

  const relatedPosts = blogs
    .filter((b) => b.id !== post.id && b.category === post.category)
    .slice(0, 2);

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation / Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-1 hover:text-blue-700 font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Share Article</span>
          </button>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-2xl uppercase tracking-wide">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                PK
              </div>
              <span className="font-semibold text-slate-800">By {post.author}</span>
            </div>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readingTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-16/9 bg-slate-100 border border-slate-200">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Body Content */}
        <article className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed space-y-5 pt-4">
          <p className="text-lg font-medium text-slate-900 leading-relaxed border-l-4 border-blue-600 pl-4 py-1 italic bg-slate-50/70 rounded-r-xl">
            {post.excerpt}
          </p>

          <div className="space-y-4 text-slate-700">
            {post.content.split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="pt-6 flex flex-wrap gap-2 border-t border-slate-100">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-2xl font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Doctor Author Card */}
        <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200/70 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={doctorProfile.photoUrl}
            alt={doctorProfile.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs shrink-0"
          />
          <div className="space-y-1 flex-1">
            <h4 className="font-bold text-slate-900 text-base">{doctorProfile.name}</h4>
            <p className="text-xs text-blue-800 font-semibold">{doctorProfile.designation} • {doctorProfile.degrees}</p>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Experienced Senior Physician with 12+ years of internal medicine and diabetology practice in Mohali. Dedicated to patient education and complication prevention.
            </p>
          </div>
          <button
            onClick={() => openAppointmentModal(`Consultation after reading: ${post.title}`)}
            className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-2xl shadow-xs shrink-0 cursor-pointer"
          >
            Consult Doctor
          </button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 border-t border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Recommended Reading</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer bg-slate-50/60"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-xs text-slate-800 line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {rel.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

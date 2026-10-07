import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { Play, PlayCircle, Video, X } from 'lucide-react';

export const HealthVideosSection: React.FC = () => {
  const { data } = useSite();
  const { videos } = data;

  const [activeVideo, setActiveVideo] = useState<{ title: string; url: string } | null>(null);

  const published = (videos || [])
    .filter((v) => v.published !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (published.length === 0) return null;

  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  return (
    <section className="py-20 bg-slate-900 border-b border-slate-800" id="videos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.7 }}
            className="space-y-3 max-w-2xl"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-blue-900/40 border border-blue-800/50 text-blue-200 text-xs font-semibold">
              <Video className="w-3.5 h-3.5" />
              <span>Medical Video Library</span>
            </div>
            <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold text-white tracking-tight">
              Patient Education Videos
            </h2>
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Watch Dr. Puneet Kumar explain critical health concepts, diabetes management protocols, and lifestyle interventions in clear, simple terms.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {published.map((vid, idx) => {
            const videoIdMatch = vid.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
            const videoId = videoIdMatch ? videoIdMatch[1] : null;
            const thumbnailUrl = videoId 
              ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` 
              : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600';

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.8, delay: (idx % 6) * 0.1 }}
                key={vid.id}
                className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-slate-500 shadow-md transition-all group cursor-pointer"
                onClick={() => setActiveVideo({ title: vid.title, url: vid.videoUrl })}
              >
                <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer">
                  <img
                    src={thumbnailUrl}
                    alt={vid.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-blue-300 transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                    {vid.description}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveVideo({ title: vid.title, url: vid.videoUrl });
                    }}
                    className="w-full py-2 px-3 rounded-2xl bg-slate-700 group-hover:bg-blue-600 text-slate-200 group-hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch Consultation Video</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-800">
              <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                <h4 className="text-sm font-bold truncate pr-4">{activeVideo.title}</h4>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1 rounded-2xl text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-16/9 bg-black">
                <iframe
                  src={getYouTubeEmbedUrl(activeVideo.url)}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

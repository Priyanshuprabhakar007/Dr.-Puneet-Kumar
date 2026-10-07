import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { Play, Video, Clock, X, Search, Sparkles } from 'lucide-react';

export const VideosPage: React.FC = () => {
  const { data } = useSite();
  const { videos } = data;

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState<{ title: string; url: string } | null>(null);

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    if (match && match[1]) {
      return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1`;
    }
    return url;
  };

  const categories = ['All', 'Diabetes', 'Hypertension', 'Thyroid', 'General Health', 'Infections'];

  const filteredVideos = videos.filter((v) => {
    const matchesCat = selectedCategory === 'All' || v.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      search === '' ||
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-red-100 text-red-800 text-xs font-semibold">
            <Video className="w-3.5 h-3.5 text-red-600" />
            <span>Physician Health Advice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Doctor Video Guidance & Health Advice
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Watch short clinical briefings by Dr. Puneet Kumar explaining diabetes control, blood pressure myths, and daily wellness habits.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search health videos by topic..."
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

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => setActiveVideo({ title: vid.title, url: vid.videoUrl })}
                  className="relative aspect-16/10 bg-slate-900 cursor-pointer overflow-hidden"
                >
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  {vid.duration && (
                    <span className="absolute bottom-2.5 right-2.5 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-2xl flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {vid.duration}
                    </span>
                  )}
                  <span className="absolute top-2.5 left-2.5 bg-blue-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded-2xl uppercase tracking-wider">
                    {vid.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3
                    onClick={() => setActiveVideo({ title: vid.title, url: vid.videoUrl })}
                    className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
                  >
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {vid.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveVideo({ title: vid.title, url: vid.videoUrl })}
                  className="w-full py-2.5 px-3 rounded-2xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Player */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
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
    </div>
  );
};

import React, { useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import {
  Calendar,
  MessageSquare,
  BookOpen,
  Star,
  Video,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export const AdminOverviewTab: React.FC<{ setActiveTab: (tab: string) => void }> = ({
  setActiveTab
}) => {
  const { data, refreshAdminPrivateData, isRefreshingPrivateData } = useSite();

  useEffect(() => {
    refreshAdminPrivateData();
  }, [refreshAdminPrivateData]);

  const totalAppointments = data.appointments?.length || 0;
  const newAppointments = data.appointments?.filter((a) => a.status === 'New').length || 0;
  const totalLeads = data.contactLeads?.length || 0;
  const publishedBlogs = data.blogs?.filter((b) => b.published !== false).length || 0;
  const totalTestimonials = data.testimonials?.filter((t) => t.isPublished !== false).length || 0;

  const recentAppointments = (data.appointments || []).slice(0, 5);
  const recentLeads = (data.contactLeads || []).slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
        <div>
          <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
            Clinical Control Center
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1">
            Welcome, Dr. Puneet Kumar
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            You have <strong className="text-white">{newAppointments} new appointment requests</strong> waiting for clinical confirmation. All edits reflect immediately on the live website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refreshAdminPrivateData()}
            disabled={isRefreshingPrivateData}
            className="px-4 py-2.5 bg-blue-800/80 hover:bg-blue-800 text-white font-semibold text-xs rounded-2xl shadow-xs transition-colors shrink-0 cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
            title="Refresh Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingPrivateData ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className="px-5 py-2.5 bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs rounded-2xl shadow-xs shrink-0 cursor-pointer"
          >
            View Appointments
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          onClick={() => setActiveTab('appointments')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Appointments</span>
            <div className="w-8 h-8 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{totalAppointments}</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">
            {newAppointments} New
          </div>
        </div>

        <div
          onClick={() => setActiveTab('leads')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Contact Leads</span>
            <div className="w-8 h-8 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{totalLeads}</div>
          <div className="text-[11px] text-slate-500 mt-1">Patient Inquiries</div>
        </div>

        <div
          onClick={() => setActiveTab('blogs')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Published Blogs</span>
            <div className="w-8 h-8 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{publishedBlogs}</div>
          <div className="text-[11px] text-slate-500 mt-1">Patient Education</div>
        </div>

        <div
          onClick={() => setActiveTab('testimonials')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Testimonials</span>
            <div className="w-8 h-8 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{totalTestimonials}</div>
          <div className="text-[11px] text-slate-500 mt-1">Verified Reviews</div>
        </div>

        <div
          onClick={() => setActiveTab('videos')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Videos</span>
            <div className="w-8 h-8 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{data.videos?.length || 0}</div>
          <div className="text-[11px] text-slate-500 mt-1">Health Advice</div>
        </div>
      </div>

      {/* Grid: Recent Appointments & Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Appointments */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Appointment Inquiries</h3>
              <p className="text-xs text-slate-500">Submitted directly from website patients</p>
            </div>
            <button
              onClick={() => setActiveTab('appointments')}
              className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentAppointments.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-400">No appointments submitted yet.</p>
            ) : (
              recentAppointments.map((apt) => (
                <div key={apt.id} className="py-3 flex items-center justify-between text-xs gap-3">
                  <div>
                    <p className="font-bold text-slate-900">{apt.patientName}</p>
                    <p className="text-slate-500 text-[11px]">
                      {apt.concern} • {apt.preferredDate} ({apt.preferredTime})
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-2xl font-bold text-[10px] uppercase ${
                        apt.status === 'New'
                          ? 'bg-blue-100 text-blue-800'
                          : apt.status === 'Confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {apt.status}
                    </span>
                    <a
                      href={`tel:${apt.phone}`}
                      className="text-blue-700 font-bold hover:underline"
                    >
                      {apt.phone}
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Management Links */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900">Quick Content Shortcuts</h3>
            <p className="text-xs text-slate-500">Jump directly to website management tabs</p>

            <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
              <button
                onClick={() => setActiveTab('treatments')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-left font-semibold text-slate-800 hover:text-blue-800 transition-colors border border-slate-200/60"
              >
                Manage Treatments
              </button>
              <button
                onClick={() => setActiveTab('diabetes')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-left font-semibold text-slate-800 hover:text-blue-800 transition-colors border border-slate-200/60"
              >
                Diabetes Services
              </button>
              <button
                onClick={() => setActiveTab('doctor')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-left font-semibold text-slate-800 hover:text-blue-800 transition-colors border border-slate-200/60"
              >
                Doctor Profile
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-left font-semibold text-slate-800 hover:text-blue-800 transition-colors border border-slate-200/60"
              >
                Write New Article
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-left font-semibold text-slate-800 hover:text-blue-800 transition-colors border border-slate-200/60"
              >
                Clinic Settings & SEO
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-left font-semibold text-slate-800 hover:text-blue-800 transition-colors border border-slate-200/60"
              >
                Media Library
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

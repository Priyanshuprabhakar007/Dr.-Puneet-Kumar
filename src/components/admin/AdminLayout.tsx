import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { AdminOverviewTab } from './AdminOverviewTab';
import { AdminDoctorTab } from './AdminDoctorTab';
import { AdminHeroTab } from './AdminHeroTab';
import { AdminTreatmentsTab } from './AdminTreatmentsTab';
import { AdminDiabetesTab } from './AdminDiabetesTab';
import { AdminAppointmentsTab } from './AdminAppointmentsTab';
import { AdminLeadsTab } from './AdminLeadsTab';
import { AdminQualificationsTab } from './AdminQualificationsTab';
import { AdminTestimonialsTab } from './AdminTestimonialsTab';
import { AdminVideosTab } from './AdminVideosTab';
import { AdminBlogTab } from './AdminBlogTab';
import { AdminFaqTab } from './AdminFaqTab';
import { AdminSettingsTab } from './AdminSettingsTab';
import { AdminMediaTab } from './AdminMediaTab';
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  User,
  Sparkles,
  Stethoscope,
  Activity,
  BookOpen,
  Video,
  Award,
  Star,
  HelpCircle,
  Settings,
  Image,
  LogOut,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { data, logoutAdmin, navigate } = useSite();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const newAppointments = data.appointments?.filter((a) => a.status === 'New').length || 0;

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      badge: newAppointments > 0 ? newAppointments : undefined
    },
    { id: 'leads', label: 'Contact Leads', icon: MessageSquare },
    { id: 'doctor', label: 'Doctor Profile', icon: User },
    { id: 'hero', label: 'Homepage Hero', icon: Sparkles },
    { id: 'treatments', label: 'Treatments & Care', icon: Stethoscope },
    { id: 'diabetes', label: 'Diabetes Services', icon: Activity },
    { id: 'blogs', label: 'Blog & Articles', icon: BookOpen },
    { id: 'videos', label: 'Video Guides', icon: Video },
    { id: 'qualifications', label: 'Qualifications & Exp', icon: Award },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'faqs', label: 'FAQs Manager', icon: HelpCircle },
    { id: 'settings', label: 'Clinic & SEO Settings', icon: Settings },
    { id: 'media', label: 'Media Library', icon: Image }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverviewTab setActiveTab={setActiveTab} />;
      case 'appointments':
        return <AdminAppointmentsTab />;
      case 'leads':
        return <AdminLeadsTab />;
      case 'doctor':
        return <AdminDoctorTab />;
      case 'hero':
        return <AdminHeroTab />;
      case 'treatments':
        return <AdminTreatmentsTab />;
      case 'diabetes':
        return <AdminDiabetesTab />;
      case 'blogs':
        return <AdminBlogTab />;
      case 'videos':
        return <AdminVideosTab />;
      case 'qualifications':
        return <AdminQualificationsTab />;
      case 'testimonials':
        return <AdminTestimonialsTab />;
      case 'faqs':
        return <AdminFaqTab />;
      case 'settings':
        return <AdminSettingsTab />;
      case 'media':
        return <AdminMediaTab />;
      default:
        return <AdminOverviewTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-2xl bg-blue-600 flex items-center justify-center font-bold text-xs">
            PK
          </div>
          <div>
            <h2 className="font-bold text-xs">Admin Control Center</h2>
            <p className="text-[10px] text-slate-400">Dr. Puneet Kumar Clinic</p>
          </div>
        </div>
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 text-slate-300 hover:text-white"
        >
          {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col justify-between transform transition-transform duration-200 lg:static lg:translate-x-0 ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-bold shadow-md">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-sm text-white">Dr. Puneet Kumar</h1>
                <p className="text-[11px] text-blue-400 font-medium">Clinic CMS & OPD</p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileNavOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-190px)] scrollbar-thin">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-2xl text-[10px] font-bold bg-blue-500 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Database Engine Status */}
        <div className="px-4 py-3 mx-4 mb-3 rounded-2xl bg-slate-800/60 border border-slate-800 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium text-[11px]">Database Engine</span>
            <span className="text-slate-300 font-semibold text-[11px]">
              Firestore Backend
            </span>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
            <span>Architecture</span>
            <span className="text-slate-300 font-medium">Server API &rarr; Firestore</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Live Website</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto">{renderActiveTab()}</div>
      </main>
    </div>
  );
};

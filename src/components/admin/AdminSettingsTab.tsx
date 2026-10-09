import React, { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { SiteSettings, SeoSettings, ClinicLocation } from '../../types';
import { Save, Phone, MapPin, Globe, Database, CheckCircle2, RefreshCw, AlertCircle, HardDrive } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

interface DbInfoState {
  status: 'checking' | 'connected' | 'unavailable';
  databaseId: string;
  storageProvider: string;
}

export const AdminSettingsTab: React.FC = () => {
  const { data, updateSection, showToast } = useSite();
  const [settings, setSettings] = useState<SiteSettings>(data.settings);
  const [seo, setSeo] = useState<SeoSettings>(data.seo);
  const [locations, setLocations] = useState<ClinicLocation[]>(data.locations);
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingDb, setIsTestingDb] = useState(false);

  const [dbInfo, setDbInfo] = useState<DbInfoState>({
    status: 'checking',
    databaseId: '(default)',
    storageProvider: 'local'
  });

  const checkDbStatus = async () => {
    try {
      const res = await fetch('/api/firebase/info', { credentials: 'include' });
      if (res.ok) {
        const info = await res.json();
        setDbInfo({
          status: info.connected ? 'connected' : 'unavailable',
          databaseId: info.databaseId || '(default)',
          storageProvider: info.mediaStorageProvider || 'local'
        });
        return info.connected;
      } else {
        setDbInfo((prev) => ({ ...prev, status: 'unavailable' }));
        return false;
      }
    } catch {
      setDbInfo((prev) => ({ ...prev, status: 'unavailable' }));
      return false;
    }
  };

  useEffect(() => {
    checkDbStatus();
  }, []);

  const testDbConnection = async () => {
    setIsTestingDb(true);
    const isConnected = await checkDbStatus();
    setIsTestingDb(false);
    if (isConnected) {
      showToast('Firebase Firestore is fully connected and active!', 'success');
    } else {
      showToast('Firebase connection is currently unavailable.', 'error');
    }
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const okSettings = await updateSection('settings', settings);
    const okSeo = await updateSection('seo', seo);
    const okLocations = await updateSection('locations', locations);
    setIsSaving(false);

    if (okSettings && okSeo && okLocations) {
      showToast('All clinic settings, SEO & locations saved successfully!', 'success');
    } else {
      showToast('Some settings failed to save to server. Please review and try again.', 'error');
    }
  };

  const handlePrimaryLocationChange = (field: keyof ClinicLocation, val: any) => {
    const updated = [...locations];
    if (updated[0]) {
      updated[0] = { ...updated[0], [field]: val };
      setLocations(updated);
    }
  };

  return (
    <form onSubmit={handleSaveAll} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Clinic Settings &amp; Global SEO</h2>
          <p className="text-xs text-slate-500">
            Configure contact phone numbers, WhatsApp, OPD hours, emergency notices, and search engine metadata
          </p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving All Settings...' : 'Save All Settings'}</span>
        </button>
      </div>

      {/* 1. Contact & Communications */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Phone className="w-4 h-4 text-blue-700" />
          <span>Clinic Contact Channels</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Primary Reception Phone *</label>
            <input
              type="tel"
              required
              value={settings.primaryPhone}
              onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Secondary / Emergency Phone</label>
            <input
              type="tel"
              value={settings.secondaryPhone || ''}
              onChange={(e) => setSettings({ ...settings, secondaryPhone: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">WhatsApp Business Number *</label>
            <input
              type="text"
              required
              value={settings.whatsappNumber}
              onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Clinic Official Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Medical Registration Number</label>
            <input
              type="text"
              value={settings.registrationNumber}
              onChange={(e) => setSettings({ ...settings, registrationNumber: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">OPD Consultation Timings</label>
            <input
              type="text"
              value={settings.consultationTimings}
              onChange={(e) => setSettings({ ...settings, consultationTimings: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Emergency Disclaimer Notice</label>
          <textarea
            rows={2}
            value={settings.emergencyNotice}
            onChange={(e) => setSettings({ ...settings, emergencyNotice: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl resize-none"
          />
        </div>
      </div>

      {/* 2. Clinic Physical Location */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-700" />
          <span>Clinic Location &amp; Google Maps</span>
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Location Name</label>
            <input
              type="text"
              value={locations[0]?.name || ''}
              onChange={(e) => handlePrimaryLocationChange('name', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Address</label>
            <input
              type="text"
              value={locations[0]?.address || ''}
              onChange={(e) => handlePrimaryLocationChange('address', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Google Maps URL (Get Directions)</label>
              <input
                type="text"
                value={locations[0]?.googleMapsUrl || ''}
                onChange={(e) => handlePrimaryLocationChange('googleMapsUrl', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                placeholder="Leave blank to auto-generate"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Google Maps Embed URL</label>
              <input
                type="text"
                value={locations[0]?.mapEmbedUrl || ''}
                onChange={(e) => handlePrimaryLocationChange('mapEmbedUrl', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                placeholder="Leave blank to auto-generate"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Latitude</label>
              <input
                type="text"
                value={locations[0]?.latitude || ''}
                onChange={(e) => handlePrimaryLocationChange('latitude', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                placeholder="e.g. 30.7062"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Longitude</label>
              <input
                type="text"
                value={locations[0]?.longitude || ''}
                onChange={(e) => handlePrimaryLocationChange('longitude', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                placeholder="e.g. 76.6974"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Global SEO & Social Meta */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-700" />
          <span>Search Engine Optimization (SEO) &amp; Social Graph</span>
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Global Page Title</label>
            <input
              type="text"
              value={seo.defaultTitle}
              onChange={(e) => setSeo({ ...seo, defaultTitle: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Meta Description</label>
            <textarea
              rows={2}
              value={seo.defaultDescription}
              onChange={(e) => setSeo({ ...seo, defaultDescription: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl resize-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">SEO Keywords (comma-separated)</label>
            <input
              type="text"
              value={seo.keywords?.join(', ') || ''}
              onChange={(e) =>
                setSeo({
                  ...seo,
                  keywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean)
                })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
            />
          </div>

          <div>
            <ImageUploadField
              label="Open Graph / Social Share Preview Image"
              value={seo.ogImage}
              onChange={(val) => setSeo({ ...seo, ogImage: val })}
              category="General"
              helperText="Displayed when sharing clinic links on WhatsApp, Facebook, LinkedIn, and Twitter/X."
            />
          </div>
        </div>
      </div>

      {/* 4. Backend Cloud Architecture & Diagnostic State */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-700" />
            <span>Database &amp; Media Storage Diagnostics</span>
          </h3>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-2xl font-bold text-[11px] border ${
              dbInfo.status === 'connected'
                ? 'bg-green-50 text-green-700 border-green-200'
                : dbInfo.status === 'checking'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {dbInfo.status === 'connected' && <span className="w-2 h-2 rounded-2xl bg-green-500"></span>}
            {dbInfo.status === 'checking' ? 'Checking Status...' : dbInfo.status === 'connected' ? 'Connected' : 'Unavailable'}
          </span>
        </div>

        <p className="text-slate-600">
          The clinic backend securely manages data persistence using Google Firestore and isolated server APIs. Appointments and patient leads are protected server-side with strict authorization.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <span className="font-bold text-slate-700 block">Database Engine:</span>
            <span className="text-slate-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Google Firestore (Firebase Admin)
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-700 block">Database ID:</span>
            <code className="text-slate-600 font-mono text-[11px]">{dbInfo.databaseId}</code>
          </div>
          <div>
            <span className="font-bold text-slate-700 block">Active Collections:</span>
            <span className="text-slate-600 font-mono text-[11px]">appointments, contactLeads, siteContent, media</span>
          </div>
          <div>
            <span className="font-bold text-slate-700 block">Media Storage Provider:</span>
            <span className="text-slate-700 font-semibold flex items-center gap-1">
              <HardDrive className="w-3.5 h-3.5 text-blue-600" />
              {dbInfo.storageProvider === 'firebase' ? 'Firebase Cloud Storage' : 'Local Server Storage'}
            </span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={testDbConnection}
            disabled={isTestingDb}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl text-xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTestingDb ? 'animate-spin' : ''}`} />
            <span>{isTestingDb ? 'Checking Server Status...' : 'Test Database Connection'}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { DoctorProfile } from '../../types';
import { Save, Plus, Trash2, User, Image, Stethoscope } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

export const AdminDoctorTab: React.FC = () => {
  const { data, updateSection } = useSite();
  const [profile, setProfile] = useState<DoctorProfile>(data.doctorProfile);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection('doctorProfile', profile);
    setIsSaving(false);
  };

  const handleFocusAdd = () => {
    setProfile({
      ...profile,
      clinicalFocus: [...(profile.clinicalFocus || []), 'New Clinical Specialty']
    });
  };

  const handleFocusChange = (index: number, val: string) => {
    const updated = [...(profile.clinicalFocus || [])];
    updated[index] = val;
    setProfile({ ...profile, clinicalFocus: updated });
  };

  const handleFocusDelete = (index: number) => {
    const updated = (profile.clinicalFocus || []).filter((_, i) => i !== index);
    setProfile({ ...profile, clinicalFocus: updated });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Doctor Profile & Medical Brand</h2>
          <p className="text-xs text-slate-500">Manage Dr. Puneet Kumar’s qualifications, bio, and clinical philosophy</p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 text-sm">Identity & Credentials</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Doctor Name</label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Title & Specialty</label>
            <input
              type="text"
              required
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Official Designation</label>
            <input
              type="text"
              required
              value={profile.designation}
              onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Degrees & Post-Graduations</label>
            <input
              type="text"
              required
              value={profile.degrees}
              onChange={(e) => setProfile({ ...profile, degrees: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Years of Clinical Experience</label>
            <input
              type="number"
              required
              value={profile.experienceYears}
              onChange={(e) => setProfile({ ...profile, experienceYears: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
            />
          </div>

          <div className="sm:col-span-2">
            <ImageUploadField 
              label="Doctor Photo"
              value={profile.photoUrl}
              onChange={(val) => setProfile({ ...profile, photoUrl: val })}
              helperText="Upload a high-quality professional portrait (JPG, PNG)."
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Doctor's Clinical Philosophy / Motto</label>
          <input
            type="text"
            value={profile.philosophy}
            onChange={(e) => setProfile({ ...profile, philosophy: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Short Biography (Homepage Summary)</label>
          <textarea
            rows={3}
            value={profile.shortBio}
            onChange={(e) => setProfile({ ...profile, shortBio: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs resize-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Full Biography (About Page - Paragraph 1)</label>
          <textarea
            rows={4}
            value={profile.fullBio?.[0] || ''}
            onChange={(e) => {
              const current = [...(profile.fullBio || [])];
              current[0] = e.target.value;
              setProfile({ ...profile, fullBio: current });
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Full Biography (About Page - Paragraph 2)</label>
          <textarea
            rows={4}
            value={profile.fullBio?.[1] || ''}
            onChange={(e) => {
              const current = [...(profile.fullBio || [])];
              current[1] = e.target.value;
              setProfile({ ...profile, fullBio: current });
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
          />
        </div>

        {/* Clinical Competencies Focus List */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="font-bold text-slate-700">Clinical Focus Bullet Points</label>
            <button
              type="button"
              onClick={handleFocusAdd}
              className="text-blue-700 font-bold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Focus Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {profile.clinicalFocus?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleFocusChange(idx, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleFocusDelete(idx)}
                  className="p-1.5 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

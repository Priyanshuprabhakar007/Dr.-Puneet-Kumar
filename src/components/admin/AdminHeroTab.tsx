import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { HeroSection } from '../../types';
import { Save, Sparkles, Award, ShieldCheck, Stethoscope, Heart } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

export const AdminHeroTab: React.FC = () => {
  const { data, updateSection, showToast } = useSite();

  const [hero, setHero] = useState<HeroSection>(() => {
    const h = data.hero || ({} as Partial<HeroSection>);
    return {
      smallHeading: h.smallHeading || 'Senior Physician & Diabetes Specialist',
      mainHeadline: h.mainHeadline || 'Comprehensive Medical & Diabetes Care You Can Trust',
      supportingCopy: h.supportingCopy || 'Personalised care for diabetes, hypertension, thyroid disorders, and acute medical concerns.',
      primaryButtonLabel: h.primaryButtonLabel || 'Book Appointment',
      primaryButtonUrl: h.primaryButtonUrl || '/book-appointment',
      secondaryButtonLabel: h.secondaryButtonLabel || 'Call Now',
      secondaryButtonUrl: h.secondaryButtonUrl || 'tel:+919876543210',
      doctorPhotoUrl: h.doctorPhotoUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=900&auto=format&fit=crop',
      experienceYears: h.experienceYears || '12+ Years Experience',
      specializationBadge: h.specializationBadge || 'Diabetes Specialist',
      internalMedicineBadge: h.internalMedicineBadge || 'Internal Medicine (MD)',
      patientCareBadge: h.patientCareBadge || 'Patient-Focused Care'
    };
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSection('hero', hero);
    setIsSaving(false);
    showToast('Hero section saved successfully!', 'success');
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Homepage Hero & Banner Manager</h2>
          <p className="text-xs text-slate-500">
            Edit the main patient-facing headlines, action buttons, doctor portrait, and trust credentials
          </p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Hero Changes'}</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-5 text-xs">
        {/* Eyebrow / Clinical Specialty Badge */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Specialty Eyebrow Pill (e.g. Senior Physician &amp; Diabetes Specialist)
          </label>
          <div className="relative">
            <input
              type="text"
              value={hero.smallHeading}
              onChange={(e) =>
                setHero({ ...hero, smallHeading: e.target.value })
              }
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:bg-white focus:outline-blue-600"
              placeholder="Senior Physician & Diabetes Specialist"
            />
          </div>
        </div>

        {/* Main Headline */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Main Banner Headline</label>
          <input
            type="text"
            required
            value={hero.mainHeadline}
            onChange={(e) =>
              setHero({ ...hero, mainHeadline: e.target.value })
            }
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:bg-white focus:outline-blue-600"
            placeholder="Comprehensive Medical & Diabetes Care You Can Trust"
          />
        </div>

        {/* Supporting Copy */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Supporting Overview Copy</label>
          <textarea
            rows={3}
            value={hero.supportingCopy}
            onChange={(e) =>
              setHero({ ...hero, supportingCopy: e.target.value })
            }
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs resize-none focus:bg-white focus:outline-blue-600"
            placeholder="Personalised care for diabetes, hypertension, thyroid disorders, infections..."
          />
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Primary CTA Button Text</label>
            <input
              type="text"
              value={hero.primaryButtonLabel}
              onChange={(e) =>
                setHero({
                  ...hero,
                  primaryButtonLabel: e.target.value
                })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Secondary CTA Button Text</label>
            <input
              type="text"
              value={hero.secondaryButtonLabel}
              onChange={(e) =>
                setHero({
                  ...hero,
                  secondaryButtonLabel: e.target.value
                })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs"
            />
          </div>
        </div>

        {/* Doctor Photo */}
        <div className="pt-2 border-t border-slate-100">
          <ImageUploadField
            label="Doctor Hero Photo"
            value={hero.doctorPhotoUrl}
            onChange={(val) =>
              setHero({
                ...hero,
                doctorPhotoUrl: val
              })
            }
            helperText="Upload a transparent PNG or high-quality portrait for the hero banner."
          />
        </div>

        {/* 4 Hero Credential Badges */}
        <div className="pt-4 border-t border-slate-100">
          <label className="font-bold text-slate-800 block mb-1">
            Hero Highlight Credential Badges (4 Cards Under Buttons)
          </label>
          <p className="text-[11px] text-slate-500 mb-3">
            These cards show key trust signals directly below the call-to-action buttons.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-1">
                <Award className="w-3.5 h-3.5 text-blue-700" />
                <span>Experience Badge</span>
              </div>
              <input
                type="text"
                value={hero.experienceYears || ''}
                onChange={(e) => setHero({ ...hero, experienceYears: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-2xl text-xs"
                placeholder="12+ Years Experience"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>Specialization Badge</span>
              </div>
              <input
                type="text"
                value={hero.specializationBadge || ''}
                onChange={(e) => setHero({ ...hero, specializationBadge: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-2xl text-xs"
                placeholder="Diabetes Specialist"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-1">
                <Stethoscope className="w-3.5 h-3.5 text-indigo-700" />
                <span>Degree / Internal Medicine Badge</span>
              </div>
              <input
                type="text"
                value={hero.internalMedicineBadge || ''}
                onChange={(e) => setHero({ ...hero, internalMedicineBadge: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-2xl text-xs"
                placeholder="Internal Medicine (MD)"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-1">
                <Heart className="w-3.5 h-3.5 text-green-700" />
                <span>Patient Care Ethos Badge</span>
              </div>
              <input
                type="text"
                value={hero.patientCareBadge || ''}
                onChange={(e) => setHero({ ...hero, patientCareBadge: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-2xl text-xs"
                placeholder="Patient-Focused Care"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

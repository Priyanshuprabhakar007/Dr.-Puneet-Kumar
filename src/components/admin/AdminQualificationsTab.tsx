import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { QualificationItem, ExperienceItem } from '../../types';
import { Plus, Trash2, Edit2, Save, Award, Building, CheckCircle2, X } from 'lucide-react';

export const AdminQualificationsTab: React.FC = () => {
  const { data, updateSection, showToast } = useSite();
  const [qualifications, setQualifications] = useState<QualificationItem[]>(data.qualifications);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(data.experience);

  // Qualification form modal
  const [editingQual, setEditingQual] = useState<QualificationItem | null>(null);
  // Experience form modal
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);

  // Save Qualification
  const handleSaveQual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQual) return;

    let updated: QualificationItem[];
    if (qualifications.some((q) => q.id === editingQual.id)) {
      updated = qualifications.map((q) => (q.id === editingQual.id ? editingQual : q));
    } else {
      updated = [...qualifications, editingQual];
    }

    const success = await updateSection('qualifications', updated);
    if (success) {
      setQualifications(updated);
      setEditingQual(null);
    }
  };

  const handleDeleteQual = async (id: string) => {
    if (!confirm('Remove this qualification?')) return;
    const updated = qualifications.filter((q) => q.id !== id);
    const success = await updateSection('qualifications', updated);
    if (success) {
      setQualifications(updated);
    }
  };

  // Save Experience
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;

    let updated: ExperienceItem[];
    if (experiences.some((exp) => exp.id === editingExp.id)) {
      updated = experiences.map((exp) => (exp.id === editingExp.id ? editingExp : exp));
    } else {
      updated = [...experiences, editingExp];
    }

    const success = await updateSection('experience', updated);
    if (success) {
      setExperiences(updated);
      setEditingExp(null);
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!confirm('Remove this experience entry?')) return;
    const updated = experiences.filter((exp) => exp.id !== id);
    const success = await updateSection('experience', updated);
    if (success) {
      setExperiences(updated);
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. Qualifications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Academic Qualifications & Fellowships</h3>
            <p className="text-xs text-slate-500">Medical degrees and certifications</p>
          </div>
          <button
            onClick={() =>
              setEditingQual({
                id: `qual-${Date.now()}`,
                degree: 'New Degree / Fellowship',
                institution: 'Medical College / Institute',
                year: '2024',
                description: 'Specialization details and clinical honors.',
                order: qualifications.length + 1
              })
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Qualification</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {qualifications.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-start justify-between gap-3"
            >
              <div>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded">
                  Year {q.year}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{q.degree}</h4>
                <p className="text-xs text-slate-600 font-medium">{q.institution}</p>
                <p className="text-[11px] text-slate-500 mt-1">{q.description}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setEditingQual(q)}
                  className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-2xl"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteQual(q.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-2xl"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Experience Timeline Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Hospital & Clinical Appointments</h3>
            <p className="text-xs text-slate-500">Career timeline in tertiary hospitals</p>
          </div>
          <button
            onClick={() =>
              setEditingExp({
                id: `exp-${Date.now()}`,
                hospital: 'Hospital Name',
                designation: 'Senior Consultant / Physician',
                duration: '2023 - Present',
                description: 'Supervision of internal medicine and diabetes outpatient clinics.',
                active: true,
                order: experiences.length + 1
              })
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Experience</span>
          </button>
        </div>

        <div className="space-y-3">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 text-sm">{exp.designation}</h4>
                  {exp.active && (
                    <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-2xl">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs text-blue-700 font-semibold">{exp.hospital} • {exp.duration}</p>
                <p className="text-[11px] text-slate-500 mt-1">{exp.description}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setEditingExp(exp)}
                  className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-2xl"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteExp(exp.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-2xl"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Qualification Modal */}
      {editingQual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-sm">Edit Qualification</h4>
              <button onClick={() => setEditingQual(null)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveQual} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Degree Title *</label>
                <input
                  type="text"
                  required
                  value={editingQual.degree}
                  onChange={(e) => setEditingQual({ ...editingQual, degree: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Institution *</label>
                <input
                  type="text"
                  required
                  value={editingQual.institution}
                  onChange={(e) => setEditingQual({ ...editingQual, institution: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Passing Year</label>
                <input
                  type="text"
                  value={editingQual.year}
                  onChange={(e) => setEditingQual({ ...editingQual, year: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  value={editingQual.description}
                  onChange={(e) => setEditingQual({ ...editingQual, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-700 text-white font-bold rounded-2xl mt-2"
              >
                Save Qualification
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 text-sm">Edit Clinical Experience</h4>
              <button onClick={() => setEditingExp(null)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveExp} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Hospital / Institute *</label>
                <input
                  type="text"
                  required
                  value={editingExp.hospital}
                  onChange={(e) => setEditingExp({ ...editingExp, hospital: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Designation *</label>
                <input
                  type="text"
                  required
                  value={editingExp.designation}
                  onChange={(e) => setEditingExp({ ...editingExp, designation: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={editingExp.duration}
                  onChange={(e) => setEditingExp({ ...editingExp, duration: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingExp.description}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl resize-none"
                />
              </div>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="currentAppt"
                  checked={editingExp.active}
                  onChange={(e) => setEditingExp({ ...editingExp, active: e.target.checked })}
                  className="rounded text-blue-700"
                />
                <label htmlFor="currentAppt" className="font-semibold text-slate-700">
                  Current Active Clinical Appointment
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-700 text-white font-bold rounded-2xl mt-2"
              >
                Save Experience
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { FaqItem } from '../../types';
import { Plus, Trash2, Edit2, HelpCircle, X, Save, Eye, EyeOff } from 'lucide-react';

export const AdminFaqTab: React.FC = () => {
  const { data, updateSection, showToast } = useSite();
  const [faqs, setFaqs] = useState<FaqItem[]>(data.faqs || []);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);

  const handleCreate = () => {
    setEditingItem({
      id: `faq-${Date.now()}`,
      question: 'New Frequently Asked Question',
      answer: 'Clear, concise clinical response provided for patients.',
      category: 'General Medicine',
      order: faqs.length + 1,
      published: true
    });
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    let updated: FaqItem[];
    if (faqs.some((f) => f.id === editingItem.id)) {
      updated = faqs.map((f) => (f.id === editingItem.id ? editingItem : f));
    } else {
      updated = [editingItem, ...faqs];
    }
    setFaqs(updated);
    await updateSection('faqs', updated);
    setEditingItem(null);
    showToast('FAQs saved!', 'success');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return;
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    await updateSection('faqs', updated);
  };

  const togglePublish = async (id: string) => {
    const updated = faqs.map((f) =>
      f.id === id ? { ...f, published: f.published === false ? true : false } : f
    );
    setFaqs(updated);
    await updateSection('faqs', updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">FAQ & Patient Guidance Manager</h2>
          <p className="text-xs text-slate-500">
            Address common queries regarding OPD timings, diabetes protocols, reports, and fees
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-start justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-2xl">
                  {faq.category}
                </span>
                <button
                  onClick={() => togglePublish(faq.id)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-2xl cursor-pointer ${
                    faq.published !== false
                      ? 'bg-green-100 text-green-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {faq.published !== false ? 'Live' : 'Hidden'}
                </button>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{faq.question}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setEditingItem(faq)}
                className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-2xl"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-2xl"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Edit FAQ</h3>
              <button onClick={() => setEditingItem(null)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Question *</label>
                <input
                  type="text"
                  required
                  value={editingItem.question}
                  onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                >
                  <option value="General Medicine">General Medicine</option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Blood Pressure">Blood Pressure</option>
                  <option value="Appointments">Appointments</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Answer *</label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.answer}
                  onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pubFaq"
                  checked={editingItem.published !== false}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, published: e.target.checked })
                  }
                  className="rounded text-blue-700"
                />
                <label htmlFor="pubFaq" className="font-semibold text-slate-700">
                  Visible on Live Website
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-2xl mt-2"
              >
                Save FAQ
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

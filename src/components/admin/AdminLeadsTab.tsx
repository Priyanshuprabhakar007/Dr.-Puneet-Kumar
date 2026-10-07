import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { ContactLead } from '../../types';
import { MessageSquare, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

export const AdminLeadsTab: React.FC = () => {
  const { data, updateSection, showToast } = useSite();
  const leads = data.contactLeads || [];

  const handleToggleResponded = async (id: string) => {
    const updated = leads.map((l) =>
      l.id === id ? { ...l, status: l.status === 'Responded' ? 'New' : 'Responded' } : l
    );
    await updateSection('contactLeads', updated);
    showToast('Lead status updated', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900">Contact Inquiries & Patient Leads</h2>
        <p className="text-xs text-slate-500">Messages sent via the website contact form</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {leads.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No contact inquiries received yet.
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Sender Details</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Message</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80">
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{lead.name}</p>
                    <a href={`tel:${lead.phone}`} className="text-[11px] text-blue-700 font-mono block">
                      {lead.phone}
                    </a>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="text-[10px] text-slate-400">
                        {lead.email}
                      </a>
                    )}
                  </td>
                  <td className="p-4 font-semibold text-slate-800">{lead.subject}</td>
                  <td className="p-4 max-w-xs">
                    <p className="line-clamp-2 text-slate-600 text-[11px]">"{lead.message}"</p>
                  </td>
                  <td className="p-4 text-[11px] text-slate-400 whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggleResponded(lead.id)}
                      className={`px-3 py-1 rounded-2xl font-bold text-[10px] cursor-pointer transition-colors ${
                        lead.status === 'Responded'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {lead.status === 'Responded' ? 'Responded' : 'Mark Responded'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

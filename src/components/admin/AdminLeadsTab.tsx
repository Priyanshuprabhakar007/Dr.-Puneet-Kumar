import React, { useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { ContactLead } from '../../types';
import { MessageSquare, Phone, Mail, Clock, CheckCircle2, RefreshCw } from 'lucide-react';

export const AdminLeadsTab: React.FC = () => {
  const {
    data,
    updateContactLead,
    refreshAdminPrivateData,
    isRefreshingPrivateData,
    privateDataError,
    showToast
  } = useSite();
  const leads = data.contactLeads || [];

  useEffect(() => {
    refreshAdminPrivateData();
  }, [refreshAdminPrivateData]);

  const handleToggleResponded = async (lead: ContactLead) => {
    const newStatus = lead.status === 'Responded' ? 'New' : 'Responded';
    const success = await updateContactLead(lead.id, { status: newStatus });
    if (!success) {
      showToast('Failed to update lead status', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Contact Inquiries & Patient Leads</h2>
          <p className="text-xs text-slate-500">Messages sent via the website contact form</p>
        </div>
        <div>
          <button
            onClick={() => refreshAdminPrivateData()}
            disabled={isRefreshingPrivateData}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-2xl transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh Contact Leads"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingPrivateData ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {isRefreshingPrivateData && leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500 text-xs space-y-3">
            <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
            <p className="font-semibold text-slate-700">Loading contact inquiries...</p>
          </div>
        ) : privateDataError && leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-xs space-y-3">
            <p className="text-red-600 font-semibold">{privateDataError}</p>
            <button
              onClick={() => refreshAdminPrivateData()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl font-bold cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        ) : leads.length === 0 ? (
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
                    {lead.submittedAt || lead.createdAt
                      ? new Date(lead.submittedAt || lead.createdAt!).toLocaleDateString()
                      : 'Recent'}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleToggleResponded(lead)}
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

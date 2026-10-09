import React, { useState, useEffect } from 'react';
import { useSite } from '../../context/SiteContext';
import { AppointmentItem } from '../../types';
import {
  Calendar,
  Phone,
  MessageCircle,
  Clock,
  User,
  Plus,
  Trash2,
  CheckCircle2,
  Filter,
  X,
  RefreshCw
} from 'lucide-react';

export const AdminAppointmentsTab: React.FC = () => {
  const {
    data,
    updateAppointmentStatus,
    createAdminAppointment,
    refreshAdminPrivateData,
    isRefreshingPrivateData,
    privateDataError,
    showToast
  } = useSite();
  const appointments = data.appointments || [];

  useEffect(() => {
    refreshAdminPrivateData();
  }, [refreshAdminPrivateData]);

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentItem | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  const [manualForm, setManualForm] = useState({
    patientName: '',
    phone: '',
    age: '',
    gender: 'Male',
    concern: 'General Consultation',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '10:00 AM - 12:00 PM',
    message: 'Walk-in patient registered at clinic desk'
  });

  const filtered = appointments.filter((apt) => {
    if (filterStatus === 'All') return true;
    return apt.status === filterStatus;
  });

  const handleStatusChange = async (id: string, newStatus: AppointmentItem['status']) => {
    const success = await updateAppointmentStatus(id, newStatus);
    if (!success) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createAdminAppointment({
      ...manualForm,
      status: 'Confirmed'
    });
    if (res.success) {
      setIsManualModalOpen(false);
      showToast('Walk-in patient appointment booked!', 'success');
      setManualForm({
        patientName: '',
        phone: '',
        age: '',
        gender: 'Male',
        concern: 'General Consultation',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: '10:00 AM - 12:00 PM',
        message: 'Walk-in patient registered at clinic desk'
      });
    } else {
      showToast(res.message || 'Failed to record walk-in patient', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Appointment Requests & OPD Schedule</h2>
          <p className="text-xs text-slate-500">
            Real-time queue of patient consultation requests from the website and clinic desk
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refreshAdminPrivateData()}
            disabled={isRefreshingPrivateData}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-2xl transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh Appointments"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingPrivateData ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-2xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Book Walk-in Patient</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'].map((status) => {
          const count =
            status === 'All'
              ? appointments.length
              : appointments.filter((a) => a.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-2xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-blue-700 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {isRefreshingPrivateData && appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500 text-xs space-y-3">
            <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
            <p className="font-semibold text-slate-700">Loading appointments queue...</p>
          </div>
        ) : privateDataError && appointments.length === 0 ? (
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
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No appointment requests found in this category.
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Patient Name & Contact</th>
                <th className="p-4">Requested Slot</th>
                <th className="p-4">Clinical Concern</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Quick Contact / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filtered.map((apt) => {
                const cleanPhone = apt.phone.replace(/[^0-9]/g, '');
                return (
                  <tr key={apt.id} className="hover:bg-slate-50/80">
                    <td className="p-4">
                      <div
                        onClick={() => setSelectedAppointment(apt)}
                        className="font-bold text-slate-900 cursor-pointer hover:text-blue-700"
                      >
                        {apt.patientName}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {apt.age ? `${apt.age} yrs` : ''} {apt.gender ? `• ${apt.gender}` : ''}
                      </p>
                      <p className="text-[11px] font-mono text-slate-700">{apt.phone}</p>
                    </td>

                    <td className="p-4">
                      <p className="font-bold text-slate-800">{apt.preferredDate}</p>
                      <p className="text-[11px] text-slate-500">{apt.preferredTime}</p>
                    </td>

                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-2xl text-[11px] font-medium inline-block max-w-[200px] truncate">
                        {apt.concern}
                      </span>
                      {apt.message && (
                        <p className="text-[11px] text-slate-400 truncate max-w-[200px] mt-1">
                          "{apt.message}"
                        </p>
                      )}
                    </td>

                    <td className="p-4">
                      <select
                        value={apt.status}
                        onChange={(e) =>
                          handleStatusChange(apt.id, e.target.value as AppointmentItem['status'])
                        }
                        className={`px-2.5 py-1 rounded-2xl text-xs font-bold border ${
                          apt.status === 'New'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : apt.status === 'Confirmed'
                            ? 'bg-green-50 text-green-800 border-green-200'
                            : apt.status === 'Contacted'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : apt.status === 'Completed'
                            ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <a
                        href={`tel:${apt.phone}`}
                        className="inline-flex p-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 rounded-2xl transition-colors"
                        title="Call patient"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                          apt.patientName
                        )},%20regarding%20your%20appointment%20with%20Dr.%20Puneet%20Kumar...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-2xl transition-colors"
                        title="WhatsApp patient"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Patient Details</h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block">Patient Name</span>
                <span className="text-sm font-bold text-slate-900">
                  {selectedAppointment.patientName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block">Phone</span>
                  <a
                    href={`tel:${selectedAppointment.phone}`}
                    className="font-bold text-blue-700 underline"
                  >
                    {selectedAppointment.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block">Age / Gender</span>
                  <span className="font-semibold text-slate-800">
                    {selectedAppointment.age || 'N/A'} • {selectedAppointment.gender || 'N/A'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block">Slot</span>
                <span className="font-semibold text-slate-800">
                  {selectedAppointment.preferredDate} at {selectedAppointment.preferredTime}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block">Clinical Concern</span>
                <span className="font-semibold text-slate-800">
                  {selectedAppointment.concern}
                </span>
              </div>

              {selectedAppointment.message && (
                <div>
                  <span className="text-slate-400 block">Patient Notes / Message</span>
                  <p className="p-3 bg-slate-50 rounded-2xl text-slate-700 italic">
                    "{selectedAppointment.message}"
                  </p>
                </div>
              )}

              <div>
                <span className="text-slate-400 block mb-1">Status</span>
                <select
                  value={selectedAppointment.status}
                  onChange={(e) => {
                    const next = e.target.value as AppointmentItem['status'];
                    handleStatusChange(selectedAppointment.id, next);
                    setSelectedAppointment({ ...selectedAppointment, status: next });
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl font-bold"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Walk-in Booking Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Book Walk-in Patient</h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Patient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jasmeet Kaur"
                  value={manualForm.patientName}
                  onChange={(e) =>
                    setManualForm({ ...manualForm, patientName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98140XXXXX"
                  value={manualForm.phone}
                  onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={manualForm.age}
                    onChange={(e) => setManualForm({ ...manualForm, age: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={manualForm.preferredDate}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, preferredDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinical Concern</label>
                <input
                  type="text"
                  value={manualForm.concern}
                  onChange={(e) => setManualForm({ ...manualForm, concern: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-2xl"
              >
                Register Walk-in Slot
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { initialData } from '../data/initialData';
import { AppData, Appointment, AppointmentStatus, ContactLead, Testimonial } from '../types';

interface SiteContextType {
  data: AppData;
  isLoading: boolean;
  isFirebaseConnected: boolean;
  currentPath: string;
  navigate: (path: string) => void;
  // Admin Authentication
  isAdminAuthenticated: boolean;
  loginAdmin: () => Promise<void>;
  logoutAdmin: () => void;
  // Private Admin Data
  refreshAdminPrivateData: () => Promise<boolean>;
  isRefreshingPrivateData: boolean;
  privateDataError: string | null;
  createAdminAppointment: (form: {
    patientName: string;
    phone: string;
    age: string;
    gender?: string;
    concern: string;
    preferredDate: string;
    preferredTime: string;
    message?: string;
    status?: AppointmentStatus;
    notes?: string;
  }) => Promise<{ success: boolean; message: string; appointment?: Appointment }>;
  updateContactLead: (id: string, updates: Partial<ContactLead>) => Promise<boolean>;
  // Dynamic Content Updating
  updateSection: <K extends keyof AppData>(section: K, value: AppData[K]) => Promise<boolean>;
  updateFullData: (newData: AppData) => Promise<boolean>;
  // Public Actions
  submitAppointment: (form: {
    patientName: string;
    phone: string;
    age: string;
    gender?: string;
    concern: string;
    preferredDate: string;
    preferredTime: string;
    message?: string;
  }) => Promise<{ success: boolean; message: string }>;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => Promise<boolean>;
  submitContact: (form: {
    name: string;
    phone: string;
    email?: string;
    subject?: string;
    message: string;
  }) => Promise<{ success: boolean; message: string }>;
  submitTestimonial: (form: {
    patientName: string;
    treatmentCategory?: string;
    location?: string;
    rating: number;
    review: string;
  }) => Promise<{ success: boolean; message: string }>;
  // Notifications
  toast: { type: 'success' | 'error' | 'info'; message: string } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
  // Quick Appointment Modal
  isAppointmentModalOpen: boolean;
  defaultConcern: string;
  openAppointmentModal: (concern?: string) => void;
  closeAppointmentModal: () => void;
  // Media manager helper
  addMedia: (media: { name: string; url: string; category: any; altText: string; size?: string }) => Promise<boolean>;
  deleteMedia: (id: string) => Promise<boolean>;
  registerUploadedMedia: (mediaItem: any) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isRefreshingPrivateData, setIsRefreshingPrivateData] = useState(false);
  const [privateDataError, setPrivateDataError] = useState<string | null>(null);

  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [defaultConcern, setDefaultConcern] = useState('');

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  }, []);

  const clearToast = useCallback(() => setToast(null), []);

  const navigate = useCallback((path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to browser popstate (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Hydrate private admin data (appointments & contact leads)
  const refreshAdminPrivateData = useCallback(async (): Promise<boolean> => {
    setIsRefreshingPrivateData(true);
    setPrivateDataError(null);
    try {
      const [appointmentsRes, leadsRes] = await Promise.all([
        fetch('/api/appointments', {
          credentials: 'include',
          cache: 'no-store'
        }),
        fetch('/api/contact-leads', {
          credentials: 'include',
          cache: 'no-store'
        })
      ]);

      if (
        appointmentsRes.status === 401 ||
        appointmentsRes.status === 403 ||
        leadsRes.status === 401 ||
        leadsRes.status === 403
      ) {
        setIsAdminAuthenticated(false);
        setData((prev) => ({
          ...prev,
          appointments: [],
          contactLeads: []
        }));
        setPrivateDataError('Unauthorized admin session');
        return false;
      }

      if (!appointmentsRes.ok || !leadsRes.ok) {
        setPrivateDataError('Failed to load private appointments or contact inquiries.');
        return false;
      }

      const appointments = await appointmentsRes.json();
      const contactLeads = await leadsRes.json();

      setData((prev) => ({
        ...prev,
        appointments: Array.isArray(appointments) ? appointments : [],
        contactLeads: Array.isArray(contactLeads) ? contactLeads : []
      }));
      setPrivateDataError(null);
      return true;
    } catch (err) {
      console.error('Error refreshing private admin data:', err);
      setPrivateDataError('Network error while refreshing private data');
      return false;
    } finally {
      setIsRefreshingPrivateData(false);
    }
  }, []);

  // Verify admin session cookie on startup
  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch('/api/admin/verify', { credentials: 'include' });
        if (res.ok) {
          const json = await res.json();
          if (json.valid) {
            setIsAdminAuthenticated(true);
            refreshAdminPrivateData();
          }
        }
      } catch {
        setIsAdminAuthenticated(false);
      }
    }
    checkAdmin();
  }, [refreshAdminPrivateData]);

  // Periodic private data refresh while admin is authenticated and in /admin
  useEffect(() => {
    if (!isAdminAuthenticated || currentPath !== '/admin') return;
    const interval = setInterval(() => {
      refreshAdminPrivateData();
    }, 45000);
    return () => clearInterval(interval);
  }, [isAdminAuthenticated, currentPath, refreshAdminPrivateData]);

  // Fetch initial public content from API
  useEffect(() => {
    let isMounted = true;
    async function loadContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json && json.settings) {
            setData((prev) => ({
              ...prev,
              ...json,
              settings: { ...prev.settings, ...(json.settings || {}) },
              doctorProfile: { ...prev.doctorProfile, ...(json.doctorProfile || {}) }
            }));
          }
        }
      } catch (e) {
        console.warn('API load failed:', e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadContent();
    return () => {
      isMounted = false;
    };
  }, []);

  const loginAdmin = useCallback(async () => {
    setIsAdminAuthenticated(true);
    showToast('Admin authenticated successfully', 'success');
    await refreshAdminPrivateData();
  }, [showToast, refreshAdminPrivateData]);

  const logoutAdmin = useCallback(async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore
    }
    setIsAdminAuthenticated(false);
    setData((prev) => ({
      ...prev,
      appointments: [],
      contactLeads: []
    }));
    showToast('Logged out of Admin Portal', 'info');
    navigate('/');
  }, [showToast, navigate]);

  const updateSection = useCallback(
    async <K extends keyof AppData>(section: K, value: AppData[K]): Promise<boolean> => {
      try {
        let endpointSection = String(section);
        if (endpointSection === 'heroSection') endpointSection = 'hero';
        if (endpointSection === 'mediaAssets') endpointSection = 'media';

        const res = await fetch(`/api/content/${endpointSection}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(value),
          credentials: 'include'
        });

        if (res.ok) {
          setData((prev) => ({ ...prev, [section]: value }));
          showToast(`Success! ${String(section)} updated and saved to Cloud.`, 'success');
          return true;
        } else {
          const err = await res.json().catch(() => ({}));
          showToast(err.error || 'Failed to update section', 'error');
          return false;
        }
      } catch (err) {
        showToast('Network error while saving changes.', 'error');
        return false;
      }
    },
    [showToast]
  );

  const updateFullData = useCallback(
    async (newData: AppData): Promise<boolean> => {
      try {
        const res = await fetch('/api/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newData),
          credentials: 'include'
        });
        if (res.ok) {
          setData(newData);
          showToast('Success! All changes published and saved to Cloud.', 'success');
          return true;
        }
        const err = await res.json().catch(() => ({}));
        showToast(err.error || 'Failed to update content', 'error');
        return false;
      } catch {
        showToast('Network error while updating content.', 'error');
        return false;
      }
    },
    [showToast]
  );

  // Public: Submit Appointment (Patient booking form)
  const submitAppointment = useCallback(
    async (form: {
      patientName: string;
      phone: string;
      age: string;
      gender?: string;
      concern: string;
      preferredDate: string;
      preferredTime: string;
      message?: string;
    }) => {
      try {
        const res = await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        const json = await res.json();
        if (res.ok && json.success) {
          return {
            success: true,
            message: json.message || 'Thank you. Your appointment request has been received.'
          };
        }
        return { success: false, message: json.error || 'Could not submit appointment request' };
      } catch (err) {
        return { success: false, message: 'Network error. Please try again later.' };
      }
    },
    []
  );

  // Admin: Create Walk-in / Desk Patient Appointment
  const createAdminAppointment = useCallback(
    async (form: {
      patientName: string;
      phone: string;
      age: string;
      gender?: string;
      concern: string;
      preferredDate: string;
      preferredTime: string;
      message?: string;
      status?: AppointmentStatus;
      notes?: string;
    }) => {
      try {
        const res = await fetch('/api/admin/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
          credentials: 'include'
        });
        const json = await res.json();
        if (res.ok && json.success) {
          const apt = json.appointment;
          if (apt) {
            setData((prev) => ({
              ...prev,
              appointments: [apt, ...(prev.appointments || []).filter((a) => a.id !== apt.id)]
            }));
          }
          return {
            success: true,
            message: json.message || 'Walk-in appointment recorded successfully.',
            appointment: apt
          };
        }
        return { success: false, message: json.error || 'Failed to record walk-in appointment' };
      } catch {
        return { success: false, message: 'Network error while recording appointment.' };
      }
    },
    []
  );

  const updateAppointmentStatus = useCallback(
    async (id: string, status: AppointmentStatus) => {
      try {
        const res = await fetch(`/api/appointments/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
          credentials: 'include'
        });
        if (res.ok) {
          setData((prev) => ({
            ...prev,
            appointments: (prev.appointments || []).map((a) => (a.id === id ? { ...a, status } : a))
          }));
          showToast(`Appointment status updated to ${status}`, 'success');
          return true;
        }
        showToast('Failed to update status', 'error');
        return false;
      } catch {
        showToast('Network error', 'error');
        return false;
      }
    },
    [showToast]
  );

  const submitTestimonial = useCallback(
    async (form: {
      patientName: string;
      treatmentCategory?: string;
      location?: string;
      rating: number;
      review: string;
    }) => {
      try {
        const res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setData((prev) => ({
            ...prev,
            testimonials: [json.testimonial, ...(prev.testimonials || [])]
          }));
          return {
            success: true,
            message: json.message || 'Thank you! Your testimonial has been submitted and is pending review.'
          };
        }
        return { success: false, message: json.error || 'Failed to submit testimonial.' };
      } catch (err) {
        return { success: false, message: 'Network error. Please try again.' };
      }
    },
    []
  );

  const submitContact = useCallback(
    async (form: { name: string; phone: string; email?: string; subject?: string; message: string }) => {
      try {
        const res = await fetch('/api/contact-leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        const json = await res.json();
        if (res.ok && json.success) {
          return { success: true, message: json.message || 'Inquiry received. We will contact you soon.' };
        }
        return { success: false, message: json.error || 'Failed to submit inquiry' };
      } catch {
        return { success: false, message: 'Network error. Please try again.' };
      }
    },
    []
  );

  const updateContactLead = useCallback(
    async (id: string, updates: Partial<ContactLead>) => {
      try {
        const res = await fetch(`/api/contact-leads/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
          credentials: 'include'
        });
        if (res.ok) {
          setData((prev) => ({
            ...prev,
            contactLeads: (prev.contactLeads || []).map((l) => (l.id === id ? { ...l, ...updates } : l))
          }));
          showToast('Contact lead updated', 'success');
          return true;
        }
        showToast('Failed to update lead', 'error');
        return false;
      } catch {
        showToast('Network error while updating lead', 'error');
        return false;
      }
    },
    [showToast]
  );

  const addMedia = useCallback(
    async (media: { name: string; url: string; category: any; altText: string; size?: string }) => {
      try {
        const res = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(media),
          credentials: 'include'
        });
        const json = await res.json();
        if (res.ok && json.success) {
          setData((prev) => ({
            ...prev,
            media: [json.media, ...(prev.media || [])]
          }));
          showToast('Media added successfully', 'success');
          return true;
        }
        showToast('Failed to save media item', 'error');
        return false;
      } catch {
        showToast('Network error', 'error');
        return false;
      }
    },
    [showToast]
  );

  const deleteMedia = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/media/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (res.ok) {
          setData((prev) => ({
            ...prev,
            media: (prev.media || []).filter((m) => m.id !== id)
          }));
          showToast('Media deleted', 'info');
          return true;
        }
        showToast('Failed to delete media', 'error');
        return false;
      } catch {
        showToast('Network error', 'error');
        return false;
      }
    },
    [showToast]
  );

  const registerUploadedMedia = useCallback((mediaItem: any) => {
    if (!mediaItem) return;
    setData((prev) => {
      const existing = prev.media || [];
      if (existing.some((m) => m.id === mediaItem.id || m.url === mediaItem.url)) {
        return prev;
      }
      return {
        ...prev,
        media: [mediaItem, ...existing]
      };
    });
  }, []);

  const openAppointmentModal = useCallback((concern: string = '') => {
    setDefaultConcern(concern);
    setIsAppointmentModalOpen(true);
  }, []);

  const closeAppointmentModal = useCallback(() => {
    setIsAppointmentModalOpen(false);
    setDefaultConcern('');
  }, []);

  return (
    <SiteContext.Provider
      value={{
        data,
        isLoading,
        isFirebaseConnected,
        currentPath,
        navigate,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        refreshAdminPrivateData,
        isRefreshingPrivateData,
        privateDataError,
        createAdminAppointment,
        updateContactLead,
        updateSection,
        updateFullData,
        submitAppointment,
        updateAppointmentStatus,
        submitContact,
        submitTestimonial,
        toast,
        showToast,
        clearToast,
        isAppointmentModalOpen,
        defaultConcern,
        openAppointmentModal,
        closeAppointmentModal,
        addMedia,
        deleteMedia,
        registerUploadedMedia
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

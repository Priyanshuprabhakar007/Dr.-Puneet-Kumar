import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { initialData } from '../data/initialData';
import { AppData, AppointmentStatus, Testimonial } from '../types';

interface SiteContextType {
  data: AppData;
  isLoading: boolean;
  isFirebaseConnected: boolean;
  currentPath: string;
  navigate: (path: string) => void;
  // Admin Authentication
  isAdminAuthenticated: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
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
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [defaultConcern, setDefaultConcern] = useState('');

  // Verify admin session cookie on startup
  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch('/api/admin/verify', { credentials: 'include' });
        if (res.ok) {
          const json = await res.json();
          if (json.valid) {
            setIsAdminAuthenticated(true);
          }
        }
      } catch {
        setIsAdminAuthenticated(false);
      }
    }
    checkAdmin();
  }, []);

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

  // Fetch initial content from API
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

  const loginAdmin = useCallback(() => {
    setIsAdminAuthenticated(true);
    showToast('Admin authenticated successfully', 'success');
  }, [showToast]);

  const logoutAdmin = useCallback(async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // ignore
    }
    setIsAdminAuthenticated(false);
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
          const apt = json.appointment;
          if (apt) {
            setData((prev) => ({
              ...prev,
              appointments: [apt, ...(prev.appointments || [])]
            }));
          }
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
          showToast('Appointment status updated', 'success');
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
          return { success: true, message: json.message || 'Thank you! Your testimonial has been submitted and is pending review.' };
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
          const lead = json.lead;
          if (lead) {
            setData((prev) => ({
              ...prev,
              contactLeads: [lead, ...(prev.contactLeads || [])]
            }));
          }
          return { success: true, message: json.message || 'Inquiry received. We will contact you soon.' };
        }
        return { success: false, message: json.error || 'Failed to submit inquiry' };
      } catch {
        return { success: false, message: 'Network error. Please try again.' };
      }
    },
    []
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
        deleteMedia
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

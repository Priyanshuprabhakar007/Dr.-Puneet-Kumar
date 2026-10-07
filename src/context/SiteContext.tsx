import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { initialData } from '../data/initialData';
import { AppData, Appointment, AppointmentStatus, ContactLead, MediaItem, Testimonial } from '../types';
import { db, handleFirestoreError, OperationType, testFirestoreConnection } from '../lib/firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

interface SiteContextType {
  data: AppData;
  isLoading: boolean;
  isFirebaseConnected: boolean;
  currentPath: string;
  navigate: (path: string) => void;
  // Admin Authentication
  isAdminAuthenticated: boolean;
  adminToken: string | null;
  loginAdmin: (token: string) => void;
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
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dr_puneet_admin_token');
    }
    return null;
  });

  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [defaultConcern, setDefaultConcern] = useState('');

  // Validate and establish Firebase connection
  useEffect(() => {
    testFirestoreConnection()
      .then((connected) => {
        setIsFirebaseConnected(connected);
      })
      .catch(() => {
        setIsFirebaseConnected(false);
      });
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

  // Fetch initial content from Firestore if API fails
  useEffect(() => {
    let isMounted = true;
    async function loadContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json && json.settings) {
            setData(json);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('API load failed, trying Firestore direct...', e);
      }

      // Firestore fallback for loading data
      try {
        const { collection, getDocs } = await import('firebase/firestore');
        const querySnapshot = await getDocs(collection(db, 'siteContent'));
        const fsData: any = {};
        
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          if (docData && docData.sectionKey && docData.data) {
            fsData[docData.sectionKey] = docData.data;
          }
        });

        // Also try to load appointments and leads
        try {
          const aptsSnapshot = await getDocs(collection(db, 'appointments'));
          const apts: any[] = [];
          aptsSnapshot.forEach((doc) => apts.push(doc.data()));
          if (apts.length > 0) fsData.appointments = apts;

          const leadsSnapshot = await getDocs(collection(db, 'contactLeads'));
          const leads: any[] = [];
          leadsSnapshot.forEach((doc) => leads.push(doc.data()));
          if (leads.length > 0) fsData.contactLeads = leads;
        } catch (subErr) {
          console.debug('Optional collection load note:', subErr);
        }

        if (isMounted && Object.keys(fsData).length > 0) {
          setData(prev => ({
            ...prev,
            ...fsData,
            settings: { ...prev.settings, ...(fsData.settings || {}) },
            doctorProfile: { ...prev.doctorProfile, ...(fsData.doctorProfile || {}) }
          }));
        }
      } catch (fsErr) {
        console.error('Final fallback: Firestore load failed', fsErr);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadContent();
    return () => {
      isMounted = false;
    };
  }, []);

  const loginAdmin = useCallback((token: string) => {
    setAdminToken(token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dr_puneet_admin_token', token);
    }
    showToast('Admin authenticated successfully', 'success');
  }, [showToast]);

  const logoutAdmin = useCallback(() => {
    setAdminToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dr_puneet_admin_token');
    }
    showToast('Logged out of Admin Portal', 'info');
    navigate('/');
  }, [showToast, navigate]);

  const updateSection = useCallback(
    async <K extends keyof AppData>(section: K, value: AppData[K]): Promise<boolean> => {
      // Sync with Firestore directly - CRITICAL for serverless environments like Netlify
      let firestoreSuccess = false;
      try {
        const secDocRef = doc(db, 'siteContent', String(section));
        await setDoc(secDocRef, {
          sectionKey: String(section),
          data: value,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        firestoreSuccess = true;
        console.log(`[Firestore] Section ${String(section)} synced directly from client.`);
      } catch (err) {
        console.error('Firestore client direct sync FAILED:', err);
        // We continue to try the API even if direct sync fails
      }

      try {
        const res = await fetch(`/api/content/${String(section)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
          },
          body: JSON.stringify(value)
        });

        if (res.ok) {
          setData((prev) => ({ ...prev, [section]: value }));
          showToast(`Success! ${String(section)} updated and saved to Firebase Cloud.`, 'success');
          return true;
        } else {
          // If API fails but Firestore succeeded, we're still mostly okay
          if (firestoreSuccess) {
            setData((prev) => ({ ...prev, [section]: value }));
            showToast(`Success! Changes saved directly to Firebase Cloud.`, 'success');
            return true;
          }
          const err = await res.json().catch(() => ({}));
          showToast(err.error || 'Failed to update section', 'error');
          return false;
        }
      } catch (err) {
        // Fallback: If we hit a network error (like 404 on Netlify), check if Firestore succeeded
        setData((prev) => ({ ...prev, [section]: value }));
        if (firestoreSuccess) {
          showToast(`Success! Changes saved directly to Firebase Cloud.`, 'success');
        } else {
          showToast(`Saved locally only. Firebase connection error.`, 'info');
        }
        return true;
      }
    },
    [adminToken, showToast]
  );

  const updateFullData = useCallback(
    async (newData: AppData): Promise<boolean> => {
      try {
        const res = await fetch('/api/content', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
          },
          body: JSON.stringify(newData)
        });
        if (res.ok) {
          setData(newData);
          showToast('Success! All changes published and saved to Firebase Cloud.', 'success');
          return true;
        }
        return false;
      } catch {
        setData(newData);
        showToast('Changes saved locally.', 'info');
        return true;
      }
    },
    [adminToken, showToast]
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
      const generatedId = 'apt-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      const appointmentPayload: Appointment = {
        id: generatedId,
        patientName: form.patientName.trim(),
        phone: form.phone.trim(),
        age: form.age ? form.age.toString() : 'Not specified',
        gender: form.gender || 'Unspecified',
        concern: form.concern.trim(),
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime || 'Flexible',
        message: form.message ? form.message.trim() : '',
        submittedAt: new Date().toISOString(),
        status: 'New',
        notes: ''
      };

      // Write directly to Firestore
      try {
        const aptDocRef = doc(db, 'appointments', generatedId);
        await setDoc(aptDocRef, appointmentPayload);
        console.log('[Firebase] Appointment saved to Firestore successfully:', generatedId);
      } catch (fsErr) {
        console.warn('[Firebase] Direct Firestore write note (will sync through API):', fsErr);
      }

      try {
        const res = await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        const json = await res.json();
        if (res.ok && json.success) {
          // Optimistically add to appointments list
          const apt = json.appointment || appointmentPayload;
          setData((prev) => ({
            ...prev,
            appointments: [apt, ...prev.appointments]
          }));
          return {
            success: true,
            message: json.message || 'Thank you. Your appointment request has been received. Our team will contact you shortly.'
          };
        }
        return { success: false, message: json.error || 'Could not submit appointment request' };
      } catch (err) {
        // Fallback optimistic submission
        setData((prev) => ({
          ...prev,
          appointments: [appointmentPayload, ...prev.appointments]
        }));
        return {
          success: true,
          message: 'Thank you. Your appointment request has been received. Our team will contact you shortly.'
        };
      }
    },
    []
  );

  const updateAppointmentStatus = useCallback(
    async (id: string, status: AppointmentStatus) => {
      // Sync with Firestore
      try {
        const aptDocRef = doc(db, 'appointments', id);
        await updateDoc(aptDocRef, { status });
      } catch (fsErr) {
        console.debug('Firestore status update note:', fsErr);
      }

      try {
        await fetch(`/api/appointments/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
          },
          body: JSON.stringify({ status })
        });
      } catch {
        // continue
      }
      setData((prev) => ({
        ...prev,
        appointments: (prev.appointments || []).map((a) => (a.id === id ? { ...a, status } : a))
      }));
      return true;
    },
    [adminToken]
  );

  const submitTestimonial = useCallback(
    async (form: {
      patientName: string;
      treatmentCategory?: string;
      location?: string;
      rating: number;
      review: string;
    }) => {
      const generatedId = `test-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const testimonialPayload: Testimonial = {
        id: generatedId,
        patientName: form.patientName.trim(),
        treatmentCategory: form.treatmentCategory?.trim() || 'General Consultation',
        location: form.location?.trim() || 'Mohali',
        rating: Number(form.rating) || 5,
        review: form.review.trim(),
        isPublished: false, // Default to false for moderation
        order: data.testimonials.length > 0 ? Math.max(...data.testimonials.map(t => t.order || 0)) + 1 : 1
      };

      // Write directly to Firestore - CRITICAL for Netlify
      let firestoreSuccess = false;
      try {
        const { collection, getDocs } = await import('firebase/firestore');
        // We need to fetch current testimonials to maintain the array in siteContent/testimonials
        // or we could use a separate collection if we wanted, but the site uses AppData structure.
        // For simplicity and matching current structure, we'll update the whole testimonials array in Firestore siteContent/testimonials
        const updatedTestimonials = [testimonialPayload, ...data.testimonials];
        const testDocRef = doc(db, 'siteContent', 'testimonials');
        await setDoc(testDocRef, {
          sectionKey: 'testimonials',
          data: updatedTestimonials,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        firestoreSuccess = true;
        console.log('[Firestore] Testimonial synced directly to cloud.');
      } catch (fsErr) {
        console.warn('[Firestore] Testimonial direct sync failed:', fsErr);
      }

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
            testimonials: [json.testimonial || testimonialPayload, ...(prev.testimonials || [])]
          }));
          return { success: true, message: json.message || 'Thank you! Your testimonial has been submitted and is pending review.' };
        }
        
        if (firestoreSuccess) {
          setData((prev) => ({
            ...prev,
            testimonials: [testimonialPayload, ...(prev.testimonials || [])]
          }));
          return { success: true, message: 'Thank you! Your testimonial has been submitted to our cloud database.' };
        }

        return { success: false, message: json.error || 'Failed to submit testimonial.' };
      } catch (err) {
        if (firestoreSuccess) {
          setData((prev) => ({
            ...prev,
            testimonials: [testimonialPayload, ...(prev.testimonials || [])]
          }));
          return { success: true, message: 'Thank you! Your testimonial has been saved to the cloud.' };
        }
        return { success: false, message: 'An error occurred. Please try again.' };
      }
    },
    [data.testimonials]
  );

  const submitContact = useCallback(
    async (form: { name: string; phone: string; email?: string; subject?: string; message: string }) => {
      const generatedLeadId = 'lead-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      const leadPayload: ContactLead = {
        id: generatedLeadId,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email ? form.email.trim() : undefined,
        subject: form.subject ? form.subject.trim() : 'Website General Inquiry',
        message: form.message.trim(),
        submittedAt: new Date().toISOString(),
        status: 'New',
        notes: ''
      };

      // Write directly to Firestore
      try {
        const leadDocRef = doc(db, 'contactLeads', generatedLeadId);
        await setDoc(leadDocRef, leadPayload);
        console.log('[Firebase] Contact lead saved to Firestore successfully:', generatedLeadId);
      } catch (fsErr) {
        console.warn('[Firebase] Direct Firestore write note (will sync through API):', fsErr);
      }

      try {
        const res = await fetch('/api/contact-leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        const json = await res.json();
        if (res.ok && json.success) {
          const lead = json.lead || leadPayload;
          setData((prev) => ({
            ...prev,
            contactLeads: [lead, ...prev.contactLeads]
          }));
          return { success: true, message: json.message || 'Inquiry received. We will contact you soon.' };
        }
        return { success: false, message: json.error || 'Failed to submit inquiry' };
      } catch {
        setData((prev) => ({
          ...prev,
          contactLeads: [leadPayload, ...prev.contactLeads]
        }));
        return { success: true, message: 'Inquiry received. We will contact you soon.' };
      }
    },
    []
  );

  const addMedia = useCallback(
    async (media: { name: string; url: string; category: any; altText: string; size?: string }) => {
      try {
        const res = await fetch('/api/media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
          },
          body: JSON.stringify(media)
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
        return false;
      } catch {
        const fallbackItem: MediaItem = {
          id: 'med-' + Date.now(),
          ...media,
          uploadedAt: new Date().toISOString().split('T')[0]
        };
        setData((prev) => ({
          ...prev,
          media: [fallbackItem, ...(prev.media || [])]
        }));
        showToast('Media added to library', 'info');
        return true;
      }
    },
    [adminToken, showToast]
  );

  const deleteMedia = useCallback(
    async (id: string) => {
      try {
        await fetch(`/api/media/${id}`, {
          method: 'DELETE',
          headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {}
        });
      } catch {
        // continue
      }
      setData((prev) => ({
        ...prev,
        media: (prev.media || []).filter((m) => m.id !== id)
      }));
      showToast('Media deleted', 'info');
      return true;
    },
    [adminToken, showToast]
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
        isAdminAuthenticated: !!adminToken,
        adminToken,
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

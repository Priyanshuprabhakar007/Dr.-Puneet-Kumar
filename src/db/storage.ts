import fs from 'fs';
import path from 'path';
import { initialData } from '../data/initialData.js';
import { AppData, Appointment, ContactLead, MediaItem } from '../types.js';
import {
  syncAppointmentToFirestore,
  removeAppointmentFromFirestore,
  syncContactLeadToFirestore,
  removeContactLeadFromFirestore,
  syncSectionToFirestore,
  loadFullDataFromFirestore,
  testFirebaseConnectivity
} from './firebaseServer.js';

let cachedData: AppData | null = null;
let lastHydrationTime: number = 0;
const HYDRATION_TTL = 30000; // 30 seconds

export async function getDatabaseAsync(forceRefresh = false): Promise<AppData> {
  const now = Date.now();
  if (cachedData && !forceRefresh && (now - lastHydrationTime < HYDRATION_TTL)) {
    return cachedData;
  }

  try {
    const fsData = await loadFullDataFromFirestore();
    if (fsData) {
      cachedData = {
        ...initialData,
        ...fsData,
        settings: { ...initialData.settings, ...(fsData.settings || {}) },
        doctorProfile: { ...initialData.doctorProfile, ...(fsData.doctorProfile || {}) },
        seo: { ...initialData.seo, ...(fsData.seo || {}) }
      };
      lastHydrationTime = now;
      return cachedData!;
    }
  } catch (err) {
    console.warn('[Storage] Warning during async hydration from Firestore (falling back to initial data):', err);
  }

  if (cachedData && !forceRefresh) return cachedData;

  cachedData = JSON.parse(JSON.stringify(initialData));
  lastHydrationTime = now;
  return cachedData!;
}

export function getDatabase(): AppData {
  if (cachedData) {
    return cachedData;
  }
  
  cachedData = JSON.parse(JSON.stringify(initialData));
  return cachedData!;
}

export function saveDatabase(data: AppData): void {
  cachedData = data;
}

export async function initializeDatabase(): Promise<void> {
  try {
    await testFirebaseConnectivity();
    const fsData = await loadFullDataFromFirestore();
    if (fsData) {
      cachedData = { 
        ...initialData, 
        ...fsData,
        settings: { ...initialData.settings, ...(fsData.settings || {}) },
        doctorProfile: { ...initialData.doctorProfile, ...(fsData.doctorProfile || {}) },
        seo: { ...initialData.seo, ...(fsData.seo || {}) }
      };
      console.log('[Storage] Global database successfully hydrated from Firestore.');
    } else {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('[Storage] Production database hydration failed: No data returned from Firestore.');
      }
      console.log('[Storage] No Firestore data found or running in preview mode. Using local initial state.');
      getDatabase();
    }
  } catch (err) {
    console.error('[Storage] Critical error during database initialization:', err);
    if (process.env.NODE_ENV === 'production') {
      throw err;
    }
    getDatabase();
  }
}

export async function addAppointment(appointmentData: {
  patientName: string;
  phone: string;
  age: string;
  gender?: string;
  concern: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}): Promise<Appointment> {
  const db = await getDatabaseAsync();
  const newAppointment: Appointment = {
    id: 'apt-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    ...appointmentData,
    submittedAt: new Date().toISOString(),
    status: 'New',
    notes: ''
  };

  // 1 & 2: Persist to Firestore first (throws on failure)
  await syncAppointmentToFirestore(newAppointment);

  // 3: Update cache
  db.appointments.unshift(newAppointment);
  saveDatabase(db);
  return newAppointment;
}

export async function updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment | null> {
  const db = await getDatabaseAsync();
  const index = db.appointments.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const updatedRecord = { ...db.appointments[index], ...updates };

  await syncAppointmentToFirestore(updatedRecord);

  db.appointments[index] = updatedRecord;
  saveDatabase(db);
  return updatedRecord;
}

export async function deleteAppointment(id: string): Promise<boolean> {
  const db = await getDatabaseAsync();
  const record = db.appointments.find((a) => a.id === id);
  if (!record) return false;

  await removeAppointmentFromFirestore(id);

  db.appointments = db.appointments.filter((a) => a.id !== id);
  saveDatabase(db);
  return true;
}

export async function addContactLead(leadData: {
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
}): Promise<ContactLead> {
  const db = await getDatabaseAsync();
  const newLead: ContactLead = {
    id: 'lead-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    ...leadData,
    submittedAt: new Date().toISOString(),
    status: 'New',
    notes: ''
  };

  await syncContactLeadToFirestore(newLead);
  db.contactLeads.unshift(newLead);
  saveDatabase(db);
  return newLead;
}

export async function updateContactLead(id: string, updates: Partial<ContactLead>): Promise<ContactLead | null> {
  const db = await getDatabaseAsync();
  const index = db.contactLeads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const updatedLead = { ...db.contactLeads[index], ...updates };
  await syncContactLeadToFirestore(updatedLead);
  db.contactLeads[index] = updatedLead;
  saveDatabase(db);
  return updatedLead;
}

export async function deleteContactLead(id: string): Promise<boolean> {
  const db = await getDatabaseAsync();
  const record = db.contactLeads.find((l) => l.id === id);
  if (!record) return false;

  await removeContactLeadFromFirestore(id);
  db.contactLeads = db.contactLeads.filter((l) => l.id !== id);
  saveDatabase(db);
  return true;
}

export async function addMediaItem(media: {
  name: string;
  url: string;
  category: 'Doctor Photos' | 'Homepage' | 'Treatments' | 'Blogs' | 'Testimonials' | 'General';
  altText: string;
  size?: string;
}): Promise<MediaItem> {
  const db = await getDatabaseAsync();
  const newItem: MediaItem = {
    id: 'med-' + Date.now(),
    ...media,
    uploadedAt: new Date().toISOString().split('T')[0]
  };

  const updatedMedia = [newItem, ...(db.media || [])];
  await syncSectionToFirestore('media', updatedMedia);
  db.media = updatedMedia;
  saveDatabase(db);
  return newItem;
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  const db = await getDatabaseAsync();
  const record = (db.media || []).find((m) => m.id === id);
  if (!record) return false;

  const updatedMedia = (db.media || []).filter((m) => m.id !== id);
  await syncSectionToFirestore('media', updatedMedia);
  db.media = updatedMedia;
  saveDatabase(db);
  return true;
}

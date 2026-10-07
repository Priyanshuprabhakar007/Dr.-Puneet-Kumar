import fs from 'fs';
import path from 'path';
import { initialData } from '../data/initialData';
import { AppData, Appointment, ContactLead, MediaItem } from '../types';
import {
  syncAppointmentToFirestore,
  removeAppointmentFromFirestore,
  syncContactLeadToFirestore,
  removeContactLeadFromFirestore,
  syncSectionToFirestore,
  loadFullDataFromFirestore
} from './firebaseServer';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

let cachedData: AppData | null = null;
let lastHydrationTime: number = 0;
const HYDRATION_TTL = 30000; // 30 seconds

export async function getDatabaseAsync(forceRefresh = false): Promise<AppData> {
  const now = Date.now();
  if (cachedData && !forceRefresh && (now - lastHydrationTime < HYDRATION_TTL)) {
    return cachedData;
  }

  // Attempt to hydrate from Firestore
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
    console.error('[Storage] Error during async hydration from Firestore:', err);
  }

  // Fallback to initialData if Firestore fails and no cache exists
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
      console.log('[Storage] No Firestore data found or could not connect. Using local initial state.');
      getDatabase();
    }
  } catch (err) {
    console.error('[Storage] Critical error during database initialization:', err);
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

  db.appointments.unshift(newAppointment);
  saveDatabase(db);
  await syncAppointmentToFirestore(newAppointment);
  return newAppointment;
}

export async function updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment | null> {
  const db = await getDatabaseAsync();
  const index = db.appointments.findIndex((a) => a.id === id);
  if (index === -1) return null;

  db.appointments[index] = { ...db.appointments[index], ...updates };
  saveDatabase(db);
  await syncAppointmentToFirestore(db.appointments[index]);
  return db.appointments[index];
}

export async function deleteAppointment(id: string): Promise<boolean> {
  const db = await getDatabaseAsync();
  const initialLength = db.appointments.length;
  db.appointments = db.appointments.filter((a) => a.id !== id);
  if (db.appointments.length !== initialLength) {
    saveDatabase(db);
    await removeAppointmentFromFirestore(id);
    return true;
  }
  return false;
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

  db.contactLeads.unshift(newLead);
  saveDatabase(db);
  await syncContactLeadToFirestore(newLead);
  return newLead;
}

export async function updateContactLead(id: string, updates: Partial<ContactLead>): Promise<ContactLead | null> {
  const db = await getDatabaseAsync();
  const index = db.contactLeads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  db.contactLeads[index] = { ...db.contactLeads[index], ...updates };
  saveDatabase(db);
  await syncContactLeadToFirestore(db.contactLeads[index]);
  return db.contactLeads[index];
}

export async function deleteContactLead(id: string): Promise<boolean> {
  const db = await getDatabaseAsync();
  const initialLength = db.contactLeads.length;
  db.contactLeads = db.contactLeads.filter((l) => l.id !== id);
  if (db.contactLeads.length !== initialLength) {
    saveDatabase(db);
    await removeContactLeadFromFirestore(id);
    return true;
  }
  return false;
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

  db.media.unshift(newItem);
  saveDatabase(db);
  await syncSectionToFirestore('media', db.media);
  return newItem;
}

export async function deleteMediaItem(id: string): Promise<boolean> {
  const db = await getDatabaseAsync();
  const initialLength = db.media.length;
  db.media = db.media.filter((m) => m.id !== id);
  if (db.media.length !== initialLength) {
    saveDatabase(db);
    await syncSectionToFirestore('media', db.media);
    return true;
  }
  return false;
}

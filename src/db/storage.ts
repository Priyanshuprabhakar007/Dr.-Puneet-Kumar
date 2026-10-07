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

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

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
  
  // Return initialData if not yet hydrated from Firestore
  cachedData = JSON.parse(JSON.stringify(initialData));
  return cachedData!;
}

export function saveDatabase(data: AppData): void {
  cachedData = data;
  // Local file save is disabled for serverless environments (Netlify)
  // Firestore sync should be handled by individual update functions
}

export async function initializeDatabase(): Promise<void> {
  try {
    const fsData = await loadFullDataFromFirestore();
    if (fsData) {
      // Merge: Firestore data takes precedence over initialData
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
      getDatabase(); // Ensure cache is at least initialData
    }
  } catch (err) {
    console.error('[Storage] Critical error during database initialization:', err);
    getDatabase(); // Fallback
  }
}

export function addAppointment(appointmentData: {
  patientName: string;
  phone: string;
  age: string;
  gender?: string;
  concern: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}): Appointment {
  const db = getDatabase();
  const newAppointment: Appointment = {
    id: 'apt-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    ...appointmentData,
    submittedAt: new Date().toISOString(),
    status: 'New',
    notes: ''
  };

  db.appointments.unshift(newAppointment);
  saveDatabase(db);
  syncAppointmentToFirestore(newAppointment).catch(() => {});
  return newAppointment;
}

export function updateAppointment(id: string, updates: Partial<Appointment>): Appointment | null {
  const db = getDatabase();
  const index = db.appointments.findIndex((a) => a.id === id);
  if (index === -1) return null;

  db.appointments[index] = { ...db.appointments[index], ...updates };
  saveDatabase(db);
  syncAppointmentToFirestore(db.appointments[index]).catch(() => {});
  return db.appointments[index];
}

export function deleteAppointment(id: string): boolean {
  const db = getDatabase();
  const initialLength = db.appointments.length;
  db.appointments = db.appointments.filter((a) => a.id !== id);
  if (db.appointments.length !== initialLength) {
    saveDatabase(db);
    removeAppointmentFromFirestore(id).catch(() => {});
    return true;
  }
  return false;
}

export function addContactLead(leadData: {
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
}): ContactLead {
  const db = getDatabase();
  const newLead: ContactLead = {
    id: 'lead-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    ...leadData,
    submittedAt: new Date().toISOString(),
    status: 'New',
    notes: ''
  };

  db.contactLeads.unshift(newLead);
  saveDatabase(db);
  syncContactLeadToFirestore(newLead).catch(() => {});
  return newLead;
}

export function updateContactLead(id: string, updates: Partial<ContactLead>): ContactLead | null {
  const db = getDatabase();
  const index = db.contactLeads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  db.contactLeads[index] = { ...db.contactLeads[index], ...updates };
  saveDatabase(db);
  syncContactLeadToFirestore(db.contactLeads[index]).catch(() => {});
  return db.contactLeads[index];
}

export function deleteContactLead(id: string): boolean {
  const db = getDatabase();
  const initialLength = db.contactLeads.length;
  db.contactLeads = db.contactLeads.filter((l) => l.id !== id);
  if (db.contactLeads.length !== initialLength) {
    saveDatabase(db);
    removeContactLeadFromFirestore(id).catch(() => {});
    return true;
  }
  return false;
}

export function addMediaItem(media: {
  name: string;
  url: string;
  category: 'Doctor Photos' | 'Homepage' | 'Treatments' | 'Blogs' | 'Testimonials' | 'General';
  altText: string;
  size?: string;
}): MediaItem {
  const db = getDatabase();
  const newItem: MediaItem = {
    id: 'med-' + Date.now(),
    ...media,
    uploadedAt: new Date().toISOString().split('T')[0]
  };

  db.media.unshift(newItem);
  saveDatabase(db);
  syncSectionToFirestore('media', db.media).catch(() => {});
  return newItem;
}

export function deleteMediaItem(id: string): boolean {
  const db = getDatabase();
  const initialLength = db.media.length;
  db.media = db.media.filter((m) => m.id !== id);
  if (db.media.length !== initialLength) {
    saveDatabase(db);
    syncSectionToFirestore('media', db.media).catch(() => {});
    return true;
  }
  return false;
}

import fs from 'fs';
import path from 'path';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

let firestoreInstance: Firestore | null = null;
let isInitialized = false;

export function getServerFirestore(): Firestore | null {
  if (isInitialized) {
    return firestoreInstance;
  }

  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (!fs.existsSync(configPath)) {
      console.warn('[Firebase] firebase-applet-config.json not found on server.');
      isInitialized = true;
      return null;
    }

    const rawConfig = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(rawConfig);

    const app = !getApps().length ? initializeApp(config) : getApp();
    firestoreInstance = getFirestore(app, config.firestoreDatabaseId);
    isInitialized = true;
    console.log(`[Firebase Server] Successfully connected to Firestore (Database ID: ${config.firestoreDatabaseId})`);
    return firestoreInstance;
  } catch (err) {
    console.error('[Firebase Server] Failed to initialize Firestore:', err);
    isInitialized = true;
    return null;
  }
}

export async function syncAppointmentToFirestore(appointment: any): Promise<void> {
  const db = getServerFirestore();
  if (!db || !appointment || !appointment.id) return;

  try {
    const docRef = doc(db, 'appointments', appointment.id);
    await setDoc(docRef, appointment, { merge: true });
    console.log(`[Firebase Server] Appointment ${appointment.id} synced to Firestore`);
  } catch (err) {
    console.warn(`[Firebase Server] Could not sync appointment ${appointment.id}:`, err);
  }
}

export async function removeAppointmentFromFirestore(id: string): Promise<void> {
  const db = getServerFirestore();
  if (!db || !id) return;

  try {
    const docRef = doc(db, 'appointments', id);
    await deleteDoc(docRef);
    console.log(`[Firebase Server] Appointment ${id} deleted from Firestore`);
  } catch (err) {
    console.warn(`[Firebase Server] Could not delete appointment ${id}:`, err);
  }
}

export async function syncContactLeadToFirestore(lead: any): Promise<void> {
  const db = getServerFirestore();
  if (!db || !lead || !lead.id) return;

  try {
    const docRef = doc(db, 'contactLeads', lead.id);
    await setDoc(docRef, lead, { merge: true });
    console.log(`[Firebase Server] Contact lead ${lead.id} synced to Firestore`);
  } catch (err) {
    console.warn(`[Firebase Server] Could not sync lead ${lead.id}:`, err);
  }
}

export async function removeContactLeadFromFirestore(id: string): Promise<void> {
  const db = getServerFirestore();
  if (!db || !id) return;

  try {
    const docRef = doc(db, 'contactLeads', id);
    await deleteDoc(docRef);
    console.log(`[Firebase Server] Lead ${id} deleted from Firestore`);
  } catch (err) {
    console.warn(`[Firebase Server] Could not delete lead ${id}:`, err);
  }
}

export async function syncSectionToFirestore(sectionKey: string, sectionData: any): Promise<void> {
  const db = getServerFirestore();
  if (!db || !sectionKey) return;

  try {
    const docRef = doc(db, 'siteContent', sectionKey);
    await setDoc(docRef, {
      sectionKey,
      data: sectionData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log(`[Firebase Server] Section ${sectionKey} synced to Firestore`);
  } catch (err) {
    console.warn(`[Firebase Server] Could not sync section ${sectionKey}:`, err);
  }
}

export async function loadFullDataFromFirestore(): Promise<any> {
  const db = getServerFirestore();
  if (!db) return null;

  try {
    const { collection, getDocs } = await import('firebase/firestore');
    const querySnapshot = await getDocs(collection(db, 'siteContent'));
    const firestoreData: any = {};
    
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      if (docData && docData.sectionKey && docData.data) {
        firestoreData[docData.sectionKey] = docData.data;
      }
    });

    // Also load appointments and leads
    const appointmentsSnapshot = await getDocs(collection(db, 'appointments'));
    const appointments: any[] = [];
    appointmentsSnapshot.forEach((doc) => {
      appointments.push(doc.data());
    });
    // Sort appointments by date (newest first)
    appointments.sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime());
    firestoreData.appointments = appointments;

    const leadsSnapshot = await getDocs(collection(db, 'contactLeads'));
    const leads: any[] = [];
    leadsSnapshot.forEach((doc) => {
      leads.push(doc.data());
    });
    leads.sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime());
    firestoreData.contactLeads = leads;

    if (Object.keys(firestoreData).length === 0) return null;
    
    console.log(`[Firebase Server] Successfully loaded data for ${Object.keys(firestoreData).length} sections/collections from Firestore`);
    return firestoreData;
  } catch (err) {
    console.error('[Firebase Server] Failed to load data from Firestore:', err);
    return null;
  }
}

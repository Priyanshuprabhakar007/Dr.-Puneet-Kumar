import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let adminDb: any = null;
let isInitialized = false;

export function getServerFirestore(): any {
  if (isInitialized) {
    return adminDb;
  }

  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      // In development / AI Studio without explicit service account keys, Firebase Admin SDK requires service account credentials.
      // Returning null gracefully avoids 7 PERMISSION_DENIED errors and falls back to initialData cleanly.
      isInitialized = true;
      console.log('[Firebase Admin] Service account credentials not set. Operating on local seed data (set FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY for production Firestore access).');
      return null;
    }

    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId: projectId || 'spheric-transit-098sv',
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
    }

    const databaseId = process.env.FIREBASE_DATABASE_ID || 'ai-studio-drpuneetkumarsen-05cd4290-e916-4ed9-9b98-9ed263c1c298';
    adminDb = getFirestore(undefined, databaseId);
    isInitialized = true;
    console.log('[Firebase Admin] Successfully initialized Firebase Admin SDK with service account');
    return adminDb;
  } catch (err) {
    console.warn('[Firebase Admin] Skipping Firebase Admin initialization:', err);
    isInitialized = true;
    return null;
  }
}

export async function syncAppointmentToFirestore(appointment: any): Promise<void> {
  const db = getServerFirestore();
  if (!db || !appointment || !appointment.id) return;
  try {
    await db.collection('appointments').doc(appointment.id).set(appointment, { merge: true });
    console.log(`[Firebase Admin] Appointment ${appointment.id} synced`);
  } catch (err) {
    console.warn(`[Firebase Admin] Could not sync appointment ${appointment.id}:`, err);
  }
}

export async function removeAppointmentFromFirestore(id: string): Promise<void> {
  const db = getServerFirestore();
  if (!db || !id) return;
  try {
    await db.collection('appointments').doc(id).delete();
    console.log(`[Firebase Admin] Appointment ${id} deleted`);
  } catch (err) {
    console.warn(`[Firebase Admin] Could not delete appointment ${id}:`, err);
  }
}

export async function syncContactLeadToFirestore(lead: any): Promise<void> {
  const db = getServerFirestore();
  if (!db || !lead || !lead.id) return;
  try {
    await db.collection('contactLeads').doc(lead.id).set(lead, { merge: true });
    console.log(`[Firebase Admin] Contact lead ${lead.id} synced`);
  } catch (err) {
    console.warn(`[Firebase Admin] Could not sync lead ${lead.id}:`, err);
  }
}

export async function removeContactLeadFromFirestore(id: string): Promise<void> {
  const db = getServerFirestore();
  if (!db || !id) return;
  try {
    await db.collection('contactLeads').doc(id).delete();
    console.log(`[Firebase Admin] Lead ${id} deleted`);
  } catch (err) {
    console.warn(`[Firebase Admin] Could not delete lead ${id}:`, err);
  }
}

export async function syncSectionToFirestore(sectionKey: string, sectionData: any): Promise<void> {
  const db = getServerFirestore();
  if (!db || !sectionKey) return;
  try {
    await db.collection('siteContent').doc(sectionKey).set({
      sectionKey,
      data: sectionData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    console.log(`[Firebase Admin] Section ${sectionKey} synced`);
  } catch (err) {
    console.warn(`[Firebase Admin] Could not sync section ${sectionKey}:`, err);
  }
}

export async function loadFullDataFromFirestore(): Promise<any> {
  const db = getServerFirestore();
  if (!db) return null;

  try {
    const firestoreData: any = {};
    const contentSnap = await db.collection('siteContent').get();
    contentSnap.forEach((doc: any) => {
      const docData = doc.data();
      if (docData && docData.sectionKey && docData.data) {
        firestoreData[docData.sectionKey] = docData.data;
      }
    });

    const aptSnap = await db.collection('appointments').get();
    const appointments: any[] = [];
    aptSnap.forEach((doc: any) => appointments.push(doc.data()));
    appointments.sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime());
    firestoreData.appointments = appointments;

    const leadsSnap = await db.collection('contactLeads').get();
    const leads: any[] = [];
    leadsSnap.forEach((doc: any) => leads.push(doc.data()));
    leads.sort((a, b) => new Date(b.submittedAt || 0).getTime() - new Date(a.submittedAt || 0).getTime());
    firestoreData.contactLeads = leads;

    if (Object.keys(firestoreData).length === 0) return null;
    return firestoreData;
  } catch (err) {
    console.error('[Firebase Admin] Failed to load data:', err);
    return null;
  }
}

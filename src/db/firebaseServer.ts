import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let adminDb: any = null;
let isInitialized = false;

export function getServerFirestore(): any {
  if (isInitialized) {
    return adminDb;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const databaseId = process.env.FIREBASE_DATABASE_ID;

  if (!projectId || !clientEmail || !privateKey || !databaseId) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[Firebase Admin] Missing required production environment variables (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_DATABASE_ID).');
    }
    isInitialized = true;
    console.log('[Firebase Admin] Environment credentials not fully provided. Operating on local seed data for preview.');
    return null;
  }

  try {
    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
    }

    adminDb = getFirestore(undefined, databaseId);
    isInitialized = true;
    console.log(`[Firebase Admin] Successfully initialized Firebase Admin SDK (Project: ${projectId}, Database: ${databaseId})`);
    return adminDb;
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`[Firebase Admin] Initialization failed: ${err instanceof Error ? err.message : String(err)}`);
    }
    console.warn('[Firebase Admin] Initialization failed in dev mode:', err);
    isInitialized = true;
    return null;
  }
}

export async function testFirebaseConnectivity(): Promise<boolean> {
  const db = getServerFirestore();
  if (!db) return false;
  try {
    const testRef = db.collection('_connectivity_test').doc('ping');
    await testRef.set({ timestamp: new Date().toISOString() });
    await testRef.delete();
    console.log('[Firebase Admin] Connectivity test PASS.');
    return true;
  } catch (err) {
    console.error('[Firebase Admin] Connectivity test FAIL:', err);
    return false;
  }
}

export async function syncAppointmentToFirestore(appointment: any): Promise<void> {
  const db = getServerFirestore();
  if (!db) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[Firebase Admin] Firestore database not connected.');
    }
    return;
  }
  await db.collection('appointments').doc(appointment.id).set(appointment, { merge: true });
}

export async function removeAppointmentFromFirestore(id: string): Promise<void> {
  const db = getServerFirestore();
  if (!db) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[Firebase Admin] Firestore database not connected.');
    }
    return;
  }
  await db.collection('appointments').doc(id).delete();
}

export async function syncContactLeadToFirestore(lead: any): Promise<void> {
  const db = getServerFirestore();
  if (!db) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[Firebase Admin] Firestore database not connected.');
    }
    return;
  }
  await db.collection('contactLeads').doc(lead.id).set(lead, { merge: true });
}

export async function removeContactLeadFromFirestore(id: string): Promise<void> {
  const db = getServerFirestore();
  if (!db) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[Firebase Admin] Firestore database not connected.');
    }
    return;
  }
  await db.collection('contactLeads').doc(id).delete();
}

export async function syncSectionToFirestore(sectionKey: string, sectionData: any): Promise<void> {
  const db = getServerFirestore();
  if (!db) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[Firebase Admin] Firestore database not connected.');
    }
    return;
  }
  await db.collection('siteContent').doc(sectionKey).set({
    sectionKey,
    data: sectionData,
    updatedAt: new Date().toISOString()
  }, { merge: true });
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
    console.warn('[Firebase Admin] Failed to load data from Firestore due to permission or connection error (falling back to initial data):', err);
    return null;
  }
}

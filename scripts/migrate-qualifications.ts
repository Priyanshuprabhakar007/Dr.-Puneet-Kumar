/**
 * Migration Script: Updates live qualifications array in Firestore
 * via authenticated Admin API: PUT /api/content/qualifications
 */

const BASE_URL = process.env.MIGRATION_API_URL || 'http://localhost:3000';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'drpuneetadmin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'puneetkumar';

export const VERIFIED_QUALIFICATIONS = [
  {
    id: 'q-1',
    degree: 'Fellowship in Diabetes Mellitus',
    institution: 'Medvarsity Apollo',
    year: 'March 2019',
    description: 'Fellowship in Diabetes Mellitus from Medvarsity Apollo.',
    order: 1,
    accreditation: 'Royal Liverpool Academy, UK'
  },
  {
    id: 'q-2',
    degree: 'M.D. Medicine',
    institution: 'D.M.C.H. Ludhiana',
    year: 'June 2016',
    description: 'M.D. Medicine from D.M.C.H. Ludhiana.',
    order: 2,
    university: 'BFUHS, Faridkot'
  },
  {
    id: 'q-3',
    degree: 'MBBS',
    institution: 'Adesh Institute of Medical Science and Research, Bathinda',
    year: 'December 2011',
    description: 'MBBS from Adesh Institute of Medical Science and Research, Bathinda.',
    order: 3,
    university: 'BFUHS, Faridkot'
  }
];

async function runMigration() {
  console.log(`Starting qualifications migration against ${BASE_URL}...`);

  // 1. Authenticate as Admin
  const loginRes = await fetch(`${BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    })
  });

  if (!loginRes.ok) {
    const errorText = await loginRes.text();
    throw new Error(`Admin login failed: ${loginRes.status} ${errorText}`);
  }

  const rawCookieHeader = loginRes.headers.get('set-cookie') || '';
  const adminCookie = rawCookieHeader.split(';')[0];
  console.log('Admin authenticated successfully.');

  // 2. Put verified qualifications to /api/content/qualifications
  const updateRes = await fetch(`${BASE_URL}/api/content/qualifications`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Cookie: adminCookie
    },
    body: JSON.stringify(VERIFIED_QUALIFICATIONS)
  });

  if (!updateRes.ok) {
    const errorText = await updateRes.text();
    throw new Error(`Failed to update qualifications: ${updateRes.status} ${errorText}`);
  }

  const result = await updateRes.json();
  console.log('Qualifications successfully updated and synced to Firestore:', result);

  // 3. Verify public content reflects updated qualifications
  const verifyRes = await fetch(`${BASE_URL}/api/content`);
  const content = await verifyRes.json();
  console.log('Verification check - live qualifications count:', content.qualifications?.length);
  console.log('Live qualifications:', JSON.stringify(content.qualifications, null, 2));
}

// Execute if run directly
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('migrate-qualifications')) {
  runMigration().catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
}

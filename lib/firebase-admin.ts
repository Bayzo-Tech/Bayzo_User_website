import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  let formattedKey = privateKey || '';

  // Handle all possible formats
  if (formattedKey.includes('\\n')) {
    formattedKey = formattedKey.replace(/\\n/g, '\n');
  }

  // Remove surrounding quotes if present
  if (formattedKey.startsWith('"') && formattedKey.endsWith('"')) {
    formattedKey = formattedKey.slice(1, -1);
    formattedKey = formattedKey.replace(/\\n/g, '\n');
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: formattedKey,
      }),
    });
  } catch (error) {
    console.error('Firebase admin init error:', error);
  }
}

export const adminAuth = admin.apps.length ? admin.auth() : null as any;
export const adminDb = admin.apps.length ? admin.firestore() : null as any;
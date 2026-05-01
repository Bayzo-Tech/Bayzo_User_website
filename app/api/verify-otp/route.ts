import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

declare global {
  var otpStore: Map<string, { otp: string; expiry: number }>;
}
if (!global.otpStore) {
  global.otpStore = new Map();
}

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json({ success: false, message: 'Phone and OTP are required' }, { status: 400 });
    }

    const stored = global.otpStore.get(phone);

    if (!stored) {
      return NextResponse.json({ success: false, message: 'OTP expired. Please request a new one.' }, { status: 400 });
    }

    if (Date.now() > stored.expiry) {
      global.otpStore.delete(phone);
      return NextResponse.json({ success: false, message: 'OTP expired. Please request a new one.' }, { status: 400 });
    }

    if (stored.otp !== otp) {
      return NextResponse.json({ success: false, message: 'Invalid OTP. Please try again.' }, { status: 400 });
    }

    global.otpStore.delete(phone);

    const mobile = `91${phone}`;
    const userRef = adminDb.collection('users').doc(mobile);
    const userSnap = await userRef.get();

    await userRef.set({
      phone: mobile,
      createdAt: userSnap.exists ? userSnap.data()?.createdAt : new Date(),
      updatedAt: new Date(),
      role: 'user',
      status: 'active',
    }, { merge: true });

    const token = await adminAuth.createCustomToken(mobile);
    const profileComplete = userSnap.exists ? userSnap.data()?.profileComplete || false : false;

    return NextResponse.json({ success: true, token, profileComplete, uid: mobile });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
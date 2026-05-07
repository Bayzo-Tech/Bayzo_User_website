import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, message: 'Phone and OTP are required' },
        { status: 400 }
      );
    }

    // ✅ FIX: Firestore-லிருந்து OTP எடுக்கிறோம்
    const otpDoc = await adminDb.collection('otpStore').doc(phone).get();

    if (!otpDoc.exists) {
      return NextResponse.json(
        { success: false, message: 'OTP expired. Please request a new one.' },
        { status: 400 }
      );
    }

    const stored = otpDoc.data();

    if (Date.now() > stored?.expiry) {
      await adminDb.collection('otpStore').doc(phone).delete();
      return NextResponse.json(
        { success: false, message: 'OTP expired. Please request a new one.' },
        { status: 400 }
      );
    }

    if (stored?.otp !== otp) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP. Please try again.' },
        { status: 400 }
      );
    }

    // ✅ OTP சரியா இருந்தா delete பண்றோம்
    await adminDb.collection('otpStore').doc(phone).delete();

    const mobile = `91${phone}`;
    const userRef = adminDb.collection('users').doc(mobile);
    const userSnap = await userRef.get();

    await userRef.set({
      phone: mobile,
      displayPhone: phone,
      createdAt: userSnap.exists ? userSnap.data()?.createdAt : new Date(),
      updatedAt: new Date(),
      role: 'user',
      status: 'active',
    }, { merge: true });

    const token = await adminAuth.createCustomToken(mobile);
    const profileComplete = userSnap.exists ? userSnap.data()?.profileComplete || false : false;
    const userName = userSnap.exists ? userSnap.data()?.name || '' : '';

    return NextResponse.json({
      success: true,
      token,
      profileComplete,
      uid: mobile,
      name: userName,
      phone: phone
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
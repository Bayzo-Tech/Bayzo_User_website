import { NextResponse } from 'next/server';

declare global {
  var otpStore: Map<string, { otp: string; expiry: number }>;
}
if (!global.otpStore) {
  global.otpStore = new Map();
}

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone || phone.length !== 10) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    global.otpStore.set(phone, {
      otp,
      expiry: Date.now() + 10 * 60 * 1000,
    });

    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': process.env.FAST2SMS_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        route: 'dlt',
        sender_id: 'VAYRAA',
        message: '214466',        // ✅ உங்கள் Template #3 Message ID
        variables_values: otp,
        flash: 0,
        numbers: phone,
      }),
    });

    const data = await response.json();
    console.log('Fast2SMS response:', JSON.stringify(data));

    if (data.return === true) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: data.message?.[0] || 'OTP அனுப்ப முடியல' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
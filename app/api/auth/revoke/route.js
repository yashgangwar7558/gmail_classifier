import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { token } = await request.json();

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`
  );

  try {
    await oauth2Client.revokeToken(token);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to revoke token', error);
    return NextResponse.json({ error: 'Failed to revoke token' }, { status: 500 });
  }
}

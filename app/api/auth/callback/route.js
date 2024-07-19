import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.GOOGLE_REDIRECT_URI}/api/auth/callback`
);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return new NextResponse('Authorization code not found', { status: 400 });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    });

    const { data: user } = await oauth2.userinfo.get();

    const userStr = encodeURIComponent(JSON.stringify(user));
    const tokensStr = encodeURIComponent(JSON.stringify(tokens));

    const redirectURL = new URL('/', process.env.NEXT_PUBLIC_BASE_URL);
    redirectURL.searchParams.set('user', userStr);
    redirectURL.searchParams.set('tokens', tokensStr);

    return NextResponse.redirect(redirectURL.toString());
  } catch (error) {
    console.error(error);
    return new NextResponse('Authentication failed', { status: 500 });
  }
}

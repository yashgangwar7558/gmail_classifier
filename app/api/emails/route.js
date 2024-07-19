import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { tokens } = await req.json();
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials(tokens);

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const response = await gmail.users.messages.list({ userId: 'me', maxResults: 30 });
    const messages = await Promise.all(
      response.data.messages.map(async (msg) => {
        try {
          const msgData = await gmail.users.messages.get({ userId: 'me', id: msg.id });
          return msgData.data;
        } catch (error) {
          console.error('Error fetching message:', msg.id, error);
          return { id: msg.id, error: 'Failed to fetch message' };
        }
      })
    );

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('Error in Gmail handler:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

import axios from 'axios';
import OpenAI from "openai"
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { openAiKey, emails } = await req.json();

    if (!openAiKey || !emails || !Array.isArray(emails)) {
      return new NextResponse('Invalid request payload', { status: 400 });
    }

    const openai = new OpenAI({
        apiKey: openAiKey,
    })

    const classifications = await Promise.all(
      emails.map(async (email) => {
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4-turbo",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: `You are a email classifier. Go through the email subject i.e \n\n ${email.payload.headers.find((header) => header.name === 'Subject')?.value} \n\n and email snippet i.e \n\n ${email.snippet} \n\n and classify into following types. \n\n Important: Emails that are personal or work-related and require immediate attention. Promotions: Emails related to sales, discounts, and marketing campaigns. Social: Emails from social networks, friends, and family. Marketing: Emails related to marketing, newsletters, and notifications. Spam: Unwanted or unsolicited emails. General: If none of the above are matched, use General. \n\n Just return me the name of the classifier.` },
                        ],
                    },
                ],
                max_tokens: 1200,
            });

          return {
            id: email.id,
            classification: response.choices[0].message.content,
          };
        } catch (error) {
          console.error('Error classifying email:', email.id, error);
          return {
            id: email.id,
            classification: 'Error',
          };
        }
      })
    );

    return NextResponse.json(classifications, { status: 200 });
  } catch (error) {
    console.error('Error in classification handler:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

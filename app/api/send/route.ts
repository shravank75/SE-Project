import { EmailTemplate } from './../../_components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function isValidEmail(email: unknown): email is string {
  return (
    typeof email === 'string' &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
  );
}

export async function POST(req) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email service not configured (RESEND_API_KEY missing)' },
      { status: 500 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const emailToSend = typeof body?.emailToSend === 'string' ? body.emailToSend.trim() : '';
  const userName = typeof body?.userName === 'string' ? body.userName.slice(0, 100) : 'Someone';
  const fileName = typeof body?.fileName === 'string' ? body.fileName.slice(0, 200) : '';
  const shortUrl = typeof body?.shortUrl === 'string' ? body.shortUrl.slice(0, 500) : '';

  if (!isValidEmail(emailToSend)) {
    return NextResponse.json({ error: 'Invalid emailToSend' }, { status: 400 });
  }
  if (!fileName || !shortUrl) {
    return NextResponse.json({ error: 'fileName and shortUrl are required' }, { status: 400 });
  }
  if (!shortUrl.startsWith('/') && !shortUrl.startsWith('http://') && !shortUrl.startsWith('https://')) {
    return NextResponse.json({ error: 'Invalid shortUrl' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const responce = { ...body, emailToSend, userName, fileName, shortUrl };

  try {
    const data = await resend.emails.send({
      from: 'filesharing@resend.dev',
      to: [emailToSend],
      subject: userName + ' shared a file with You',
      react: EmailTemplate({ responce }),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Resend send failed:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
  }
}
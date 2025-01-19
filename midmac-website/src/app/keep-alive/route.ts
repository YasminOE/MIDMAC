import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  try {
    const url = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000';
    await fetch(`https://${url}/admin`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Keep-alive request failed:', error);
    return NextResponse.json({ ok: false, error: 'Keep-alive request failed' }, { status: 500 });
  }
}
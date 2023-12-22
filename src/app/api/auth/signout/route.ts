import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  const now = new Date();
  cookieStore.set({
    name: 'accessToken',
    value: '',
    expires: new Date(now.setDate(now.getDate() - 1)),
  });
  return NextResponse.json({ status: 205 });
}

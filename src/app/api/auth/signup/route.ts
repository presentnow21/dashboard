import { signup } from '@/controller/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // console.log(await req.json());
  const data = await req.json();
  try {
    const tokenInfo = await signup(data);
    return NextResponse.json(tokenInfo, { status: 200 });
  } catch (err) {
    console.log('signup error: ', err);
    return NextResponse.json('fail', { status: 409 });
  }
}

import { signin } from '@/controller/auth';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const { token } = await signin({ email, password });

    const decoded = jwt.decode(token)! as {
      id: number;
      email: string;
      iat: number;
      exp: number;
    };
    console.log('decoded: ', decoded);
    const expireDate = new Date(decoded.exp * 1000);
    const cookieStore = cookies();
    cookieStore.set({
      name: 'accessToken',
      value: token,
      expires: expireDate,
    });
    return NextResponse.json(
      { token, email: decoded.email, id: decoded.id },
      { status: 200 }
    );
  } catch (err) {
    console.log('err: ', err);
    return NextResponse.json('invalid user or password', { status: 409 });
  }
}

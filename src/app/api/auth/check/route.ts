import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { findByUserEmail } from '@/service/auth';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken');

  if (!accessToken) return NextResponse.json('');

  const decoded = jwt.decode(accessToken.value)! as {
    email: string;
    id: number;
    iat: number;
    exp: number;
  };

  if (!decoded) return NextResponse.json('');

  const user = await findByUserEmail(decoded.email);

  if (user)
    return NextResponse.json({
      accessToken,
      email: decoded.email,
      id: decoded.id,
    });
  else return NextResponse.json({ status: 409 });
}

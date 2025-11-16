import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import ENV from '@/constants/env';
import { hashPassword } from '@/utils/cryptos/hash';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Fake user check (replace with DB lookup)
  if (username === ENV.USERNAME && password === ENV.PASSWORD) {
    const token = jwt.sign({ username: username, password:await hashPassword(password) }, ENV.JWT_SECRET, {
      expiresIn: '1h',
    });

    const res = NextResponse.json({ message: 'Login successful' });
    res.cookies.set('token', token, { httpOnly: true }); // store in cookie
    return res;
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}

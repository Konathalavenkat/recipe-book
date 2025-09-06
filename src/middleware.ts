import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import ENV from './constants/env';  
import { comparePassword } from './utils/cryptos/compare';

export const runtime = 'nodejs';

export function middleware(req: NextRequest) {
  // Read token from cookies
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    const {username, password} = payload as {username: string, password: string};

    // TODO: Replace this with DB lookup
    if(username !== ENV.USERNAME || !comparePassword(ENV.PASSWORD, password)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next(); // allow request
  } catch {
    return NextResponse.json({ message: 'Invalid Token' }, { status: 403 });
  }
}

export const config = {
  matcher: ['/api/restricted/:path*'], // protect only API routes
};

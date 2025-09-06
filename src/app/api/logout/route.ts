import { NextResponse } from 'next/server';

export const GET = (req: Request) =>{
    const res = NextResponse.next();
    res.cookies.delete('token');
    return NextResponse.json({ message: 'Logout successful' });
};
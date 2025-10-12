import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('Login API route called');
    const userData = await request.json();
    console.log('Received user data:', userData);

    if (!userData || !userData.token) {
      console.log('No user data or token provided');
      return NextResponse.json({ error: 'User data and token are required' }, { status: 400 });
    }

    const cookieStore = await cookies();
    console.log('Setting session cookie');
    cookieStore.set('session', JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    console.log('Login successful');
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
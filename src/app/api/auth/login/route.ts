import { NextRequest, NextResponse } from 'next/server';
import { profileGridClient } from '@/lib/profilegrid-client';
import { createSession, setSessionCookie } from '@/lib/auth';
import { syncUser } from '@/lib/user-sync';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Authenticate with ProfileGrid
    const authResult = await profileGridClient.authenticateUser(username, password);

    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        { success: false, message: authResult.message || 'Authentication failed' },
        { status: 401 }
      );
    }

    // Sync user to local database
    const user = await syncUser(authResult.user);

    // Check if user is admin
    const isAdmin = profileGridClient.isAdmin(authResult.user.roles);

    // Create session
    const token = await createSession({
      userId: user.id,
      wordpressId: user.wordpressId,
      email: user.email,
      displayName: user.displayName || '',
      isAdmin,
    });

    // Set session cookie
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        isAdmin,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
);
const COOKIE_NAME = 'newsletter-session';

export interface SessionPayload {
  userId: number;
  wordpressId: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  expiresAt: number;
}

/**
 * Create a JWT session token
 */
export async function createSession(payload: Omit<SessionPayload, 'expiresAt'>): Promise<string> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const token = await new SignJWT({ ...payload, expiresAt: expiresAt.getTime() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify and decrypt a JWT session token
 */
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });

    return payload as unknown as SessionPayload;
  } catch (error) {
    console.error('Session verification failed:', error);
    return null;
  }
}

/**
 * Get the current session from cookies
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySession(token);
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}

/**
 * Delete session cookie
 */
export async function deleteSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Middleware helper: Check if user is authenticated
 */
export async function requireAuth(request: NextRequest): Promise<{
  isAuthenticated: boolean;
  session: SessionPayload | null;
  response?: NextResponse;
}> {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return {
      isAuthenticated: false,
      session: null,
      response: NextResponse.redirect(new URL('/login', request.url)),
    };
  }

  const session = await verifySession(token);

  if (!session) {
    return {
      isAuthenticated: false,
      session: null,
      response: NextResponse.redirect(new URL('/login', request.url)),
    };
  }

  return {
    isAuthenticated: true,
    session,
  };
}

/**
 * Middleware helper: Check if user is admin
 */
export async function requireAdmin(request: NextRequest): Promise<{
  isAdmin: boolean;
  session: SessionPayload | null;
  response?: NextResponse;
}> {
  const authCheck = await requireAuth(request);

  if (!authCheck.isAuthenticated || authCheck.response) {
    return {
      isAdmin: false,
      session: null,
      response: authCheck.response,
    };
  }

  if (!authCheck.session?.isAdmin) {
    return {
      isAdmin: false,
      session: authCheck.session,
      response: NextResponse.redirect(new URL('/unauthorized', request.url)),
    };
  }

  return {
    isAdmin: true,
    session: authCheck.session,
  };
}

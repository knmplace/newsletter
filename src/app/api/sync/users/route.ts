import { NextRequest, NextResponse } from 'next/server';
import { syncAllUsers } from '@/lib/user-sync';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const authCheck = await requireAdmin(request);

    if (!authCheck.isAdmin || authCheck.response) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Sync all users
    const result = await syncAllUsers();

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'User sync failed',
          error: result.error
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Synced ${result.count} users`,
      count: result.count,
    });
  } catch (error) {
    console.error('User sync error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

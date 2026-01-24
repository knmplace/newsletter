import { prisma } from './prisma';
import { profileGridClient, ProfileGridUser } from './profilegrid-client';

/**
 * Sync a single user from WordPress to local database
 */
export async function syncUser(pgUser: ProfileGridUser) {
  try {
    const isAdmin = profileGridClient.isAdmin(pgUser.roles);

    // Upsert user
    const user = await prisma.user.upsert({
      where: { wordpressId: pgUser.id },
      update: {
        email: pgUser.user_email,
        firstName: pgUser.first_name || null,
        lastName: pgUser.last_name || null,
        displayName: pgUser.display_name,
        roles: pgUser.roles,
        isActive: true,
        lastSyncedAt: new Date(),
      },
      create: {
        wordpressId: pgUser.id,
        email: pgUser.user_email,
        firstName: pgUser.first_name || null,
        lastName: pgUser.last_name || null,
        displayName: pgUser.display_name,
        roles: pgUser.roles,
        isActive: true,
      },
    });

    // Create user preferences if they don't exist
    await prisma.userPreference.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        isSubscribed: true,
        emailFrequency: 'weekly',
      },
    });

    // Create or remove admin user record based on role
    if (isAdmin) {
      await prisma.adminUser.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          canManageTemplates: true,
          canManageCampaigns: true,
          canManageUsers: true,
        },
      });
    } else {
      // Remove admin record if user is no longer admin
      await prisma.adminUser.deleteMany({
        where: { userId: user.id },
      });
    }

    return user;
  } catch (error) {
    console.error(`Error syncing user ${pgUser.id}:`, error);
    throw error;
  }
}

/**
 * Sync all users from WordPress to local database
 */
export async function syncAllUsers() {
  try {
    let page = 1;
    let totalSynced = 0;
    let hasMore = true;

    while (hasMore) {
      const users = await profileGridClient.getAllUsers(page, 100);

      if (users.length === 0) {
        hasMore = false;
        break;
      }

      for (const pgUser of users) {
        await syncUser(pgUser);
        totalSynced++;
      }

      page++;
    }

    console.log(`✅ Synced ${totalSynced} users from WordPress`);
    return { success: true, count: totalSynced };
  } catch (error) {
    console.error('Error syncing all users:', error);
    return { success: false, count: 0, error };
  }
}

/**
 * Get or create user from WordPress ID
 */
export async function getOrCreateUser(wordpressId: string) {
  // Check if user exists in database
  let user = await prisma.user.findUnique({
    where: { wordpressId },
    include: {
      adminUser: true,
      preferences: true,
    },
  });

  if (user) {
    return user;
  }

  // Fetch from WordPress and sync
  const pgUser = await profileGridClient.getUserById(wordpressId);

  if (!pgUser) {
    throw new Error(`User ${wordpressId} not found in WordPress`);
  }

  const syncedUser = await syncUser(pgUser);

  // Return user with relations
  user = await prisma.user.findUnique({
    where: { id: syncedUser.id },
    include: {
      adminUser: true,
      preferences: true,
    },
  });

  return user;
}

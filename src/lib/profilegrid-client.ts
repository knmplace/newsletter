/**
 * ProfileGrid API Client
 * Handles all communication with WordPress ProfileGrid API
 */

interface ProfileGridUser {
  id: string;
  user_email: string;
  user_login: string;
  display_name: string;
  first_name?: string;
  last_name?: string;
  roles: string[];
}

interface AuthResponse {
  success: boolean;
  user?: ProfileGridUser;
  message?: string;
}

class ProfileGridClient {
  private baseUrl: string;
  private wordpressUrl: string;
  private username: string;
  private appPassword: string;

  constructor() {
    this.baseUrl = process.env.PROFILEGRID_API_URL || '';
    this.wordpressUrl = process.env.WORDPRESS_URL || '';
    this.username = process.env.WORDPRESS_USERNAME || '';
    this.appPassword = process.env.WORDPRESS_APP_PASSWORD || '';
  }

  /**
   * Create Basic Auth header for WordPress API
   */
  private getAuthHeader(): string {
    const credentials = Buffer.from(
      `${this.username}:${this.appPassword}`
    ).toString('base64');
    return `Basic ${credentials}`;
  }

  /**
   * Authenticate user with ProfileGrid
   */
  async authenticateUser(
    username: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      // Use WordPress REST API to authenticate
      const response = await fetch(`${this.wordpressUrl}/wp-json/wp/v2/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getAuthHeader(),
        },
      });

      if (!response.ok) {
        return {
          success: false,
          message: 'Invalid credentials',
        };
      }

      const wpUser = await response.json();

      // Get additional user data from ProfileGrid
      const pgResponse = await fetch(
        `${this.baseUrl}/users/${wpUser.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.getAuthHeader(),
          },
        }
      );

      let userData = wpUser;
      if (pgResponse.ok) {
        const pgData = await pgResponse.json();
        userData = { ...wpUser, ...pgData };
      }

      return {
        success: true,
        user: {
          id: userData.id.toString(),
          user_email: userData.email,
          user_login: userData.username || userData.slug,
          display_name: userData.name,
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          roles: userData.roles || [],
        },
      };
    } catch (error) {
      console.error('ProfileGrid authentication error:', error);
      return {
        success: false,
        message: 'Authentication failed',
      };
    }
  }

  /**
   * Get user by WordPress ID
   */
  async getUserById(wordpressId: string): Promise<ProfileGridUser | null> {
    try {
      const response = await fetch(
        `${this.wordpressUrl}/wp-json/wp/v2/users/${wordpressId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.getAuthHeader(),
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const wpUser = await response.json();

      return {
        id: wpUser.id.toString(),
        user_email: wpUser.email,
        user_login: wpUser.username || wpUser.slug,
        display_name: wpUser.name,
        first_name: wpUser.first_name || '',
        last_name: wpUser.last_name || '',
        roles: wpUser.roles || [],
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  /**
   * Get all users from WordPress
   */
  async getAllUsers(page = 1, perPage = 100): Promise<ProfileGridUser[]> {
    try {
      const response = await fetch(
        `${this.wordpressUrl}/wp-json/wp/v2/users?page=${page}&per_page=${perPage}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.getAuthHeader(),
          },
        }
      );

      if (!response.ok) {
        return [];
      }

      const wpUsers = await response.json();

      return wpUsers.map((wpUser: any) => ({
        id: wpUser.id.toString(),
        user_email: wpUser.email,
        user_login: wpUser.username || wpUser.slug,
        display_name: wpUser.name,
        first_name: wpUser.first_name || '',
        last_name: wpUser.last_name || '',
        roles: wpUser.roles || [],
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  /**
   * Check if user has admin role
   */
  isAdmin(roles: string[]): boolean {
    const adminRoles = ['administrator', 'admin'];
    return roles.some((role) => adminRoles.includes(role.toLowerCase()));
  }
}

export const profileGridClient = new ProfileGridClient();
export type { ProfileGridUser, AuthResponse };

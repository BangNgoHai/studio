/**
 * @fileoverview This file contains a simulated authentication utility.
 * In a real application, this would be replaced with a proper authentication service.
 */

type User = {
  name: string;
  email: string;
  role: 'manager' | 'player';
};

/**
 * Gets the current logged-in user.
 * For this prototype, it returns a hardcoded "manager" user.
 * @returns The current user object.
 */
export function getCurrentUser(): User {
  return {
    name: 'Team Captain',
    email: 'captain@gridiron.com',
    role: 'manager',
  };
}

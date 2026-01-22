import { User } from '../domain/user';

export function loadUser(id: string): User {
  return { id, email: 'user@example.com' };
}

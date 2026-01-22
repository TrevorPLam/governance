import { Account } from '../domain/account';

export function loadAccount(id: string): Account {
  return { id, name: 'example' };
}

import { Order } from '../domain/order';

export function loadOrder(id: string): Order {
  return { id, total: 0 };
}

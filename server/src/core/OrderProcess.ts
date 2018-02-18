
import { IOrder } from '../db/models/Order';

export function formatOrder(order: IOrder): string {
  const formattedItems = order.items.map(item => `${item.foodMenuItem.title}: ${item.qty}`);
  const formattedOrder = formattedItems.join('\n');
  return formattedOrder;
}

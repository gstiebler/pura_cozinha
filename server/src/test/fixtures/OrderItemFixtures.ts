import { OrderItem } from '../../db/models/OrderItem';
import { Order } from '../../db/models/Order';
import { MenuItem } from '../../db/models/menuItem';
import { idByValue } from '../lib/TestUtils';

export default async () => {
  const orders = await Order.find();
  const sandubaFrango: any = await MenuItem.findOne({ title: 'Sanduba de frango' });
  return [
    {
      order: orders[0]._id,
      food_menu_item: sandubaFrango._id,
      quantity: 1.0,
      item_title: sandubaFrango.title,
      price: sandubaFrango.price
    },
    {
      order: orders[1]._id,
      food_menu_item: sandubaFrango._id,
      quantity: 2.0,
      item_title: sandubaFrango.title,
      price: sandubaFrango.price
    },
  ];
}

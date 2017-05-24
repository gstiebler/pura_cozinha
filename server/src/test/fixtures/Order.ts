import { Order, PaymentStatus } from '../../db/models/Order';
import { Kitchen } from '../../db/models/kitchen';
import { idByValue } from '../lib/TestUtils';
import { MenuItem } from '../../db/models/menuItem';

export default async function execute() {
  const sandubaFrango: any = await MenuItem.findOne({ title: 'Sanduba de frango' });
  const acai: any = await MenuItem.findOne({ title: 'Açai' });
  await Order.collection.insert([
    {
      user_id: 'xxx',
      kitchen: await idByValue(Kitchen, 'name', 'Cozinha do Marcel'),
      total_paid: 40.0,
      datetime: new Date(),
      status: PaymentStatus.PAYMENT_OK,
      items: [
        {
          food_menu_item_id: sandubaFrango._id,
          quantity: 1.0,
          item_title: sandubaFrango.title,
          price: sandubaFrango.price
        },
      ]
    },
    {
      user_id: 'xxx',
      kitchen: await idByValue(Kitchen, 'name', 'Outra cozinha'),
      total_paid: 38.50,
      datetime: new Date(),
      status: PaymentStatus.READY,
      items: [
        {
          food_menu_item_id: sandubaFrango._id,
          quantity: 2.0,
          item_title: sandubaFrango.title,
          price: sandubaFrango.price
        },
        {
          food_menu_item_id: acai._id,
          quantity: 5.0,
          item_title: acai.title,
          price: acai.price
        },
      ]
    },
  ]);
}
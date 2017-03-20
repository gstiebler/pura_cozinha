import { Order } from '../../db/models/Order';
import { Kitchen } from '../../db/models/kitchen';
import { idByValue } from '../lib/TestUtils';

export default async function execute() {
  await Order.collection.insert([
    {
      user_id: 'xxx',
      kitchen_id: await idByValue(Kitchen, 'name', 'Cozinha do Marcel'),
      total_paid: 40.0,
      datetime: new Date()
    },
    {
      user_id: 'xxx',
      kitchen_id: await idByValue(Kitchen, 'name', 'Outra cozinha'),
      total_paid: 38.50,
      datetime: new Date()
    },
  ]);
}
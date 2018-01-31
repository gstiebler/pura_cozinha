import * as mongoose from 'mongoose';
import kitchenFixtures from './kitchen';
import menuItemFixtures from './menuItem';
import OrderFixtures from './Order';
import OrderItemFixtures from './OrderItem';
import UserFixtures from './UserFixtures';
import { MenuItem } from '../../db/models/menuItem';
import { Kitchen } from '../../db/models/kitchen';
import { OrderItem } from '../../db/models/OrderItem';

export async function initFixtures() {
  await MenuItem.remove({});
  await Kitchen.remove({});
  await OrderItem.remove({});

  await MenuItem.insertMany(await menuItemFixtures());
  // await Kitchen.insertMany(await kitchenFixtures());
  // await OrderItem.insertMany(await OrderItemFixtures());
}

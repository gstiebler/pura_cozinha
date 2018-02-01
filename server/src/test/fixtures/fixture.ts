import * as mongoose from 'mongoose';
import * as logger from 'winston';
import kitchenFixtures from './kitchen';
import menuItemFixtures from './menuItem';
import OrderFixtures from './OrderFixtures';
import OrderItemFixtures from './OrderItemFixtures';
import UserFixtures from './UserFixtures';
import { MenuItem } from '../../db/models/menuItem';
import { Kitchen } from '../../db/models/kitchen';
import { Order } from '../../db/models/Order';
import { OrderItem } from '../../db/models/OrderItem';
import { User } from '../../db/models/User';

export async function initFixtures() {
  await User.remove({});
  await OrderItem.remove({});
  await Order.remove({});
  await Kitchen.remove({});
  await MenuItem.remove({});

  await MenuItem.insertMany(await menuItemFixtures());
  await Kitchen.insertMany(await kitchenFixtures());
  await Order.insertMany(await OrderFixtures());
  await OrderItem.insertMany(await OrderItemFixtures());
  await UserFixtures();
}

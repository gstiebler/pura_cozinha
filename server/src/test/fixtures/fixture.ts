import * as mongoose from 'mongoose';
import kitchenFixtures from './kitchen';
import menuItemFixtures from './menuItem';
import OrderFixtures from './Order';
import UserFixtures from './UserFixtures';
import { MenuItem } from '../../db/models/menuItem';

export async function initFixtures() {
  await MenuItem.remove({});

  await MenuItem.insertMany(await menuItemFixtures());
}

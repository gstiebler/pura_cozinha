import * as mongoose from 'mongoose';
import * as logger from 'winston';
import kitchenFixtures from './kitchen';
import menuItemFixtures from './menuItem';
import OrderFixtures from './OrderFixtures';
import UserFixtures from './UserFixtures';
import IngredientFixtures from './IngredientFixtures';
import { MenuItem } from '../../db/models/menuItem';
import { Kitchen } from '../../db/models/kitchen';
import { Order } from '../../db/models/Order';
import { User } from '../../db/models/User';
import { IngredientType } from '../../db/models/IngredientType';

export async function initFixtures() {
  await Promise.all([
    User.remove({}),
    Order.remove({}),
    Kitchen.remove({}),
    MenuItem.remove({}),
    IngredientType.remove({}),
  ]);

  await IngredientType.insertMany(await IngredientFixtures() );
  await MenuItem.insertMany(await menuItemFixtures());
  await Kitchen.insertMany(await kitchenFixtures());
  await Order.insertMany(await OrderFixtures());
  await UserFixtures();
}

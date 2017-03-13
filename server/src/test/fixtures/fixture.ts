import * as mongoose from 'mongoose';
import { init, MongoURL } from '../../db';
import kitchenFixtures from './kitchen';
import menuItemFixtures from './menuItem';

export default async function execute() {
  await resetDb();
  await kitchenFixtures();
  await menuItemFixtures();
}

async function resetDb() {
  await dropDb();
  await init();
};

async function dropDb() {
  (<any>mongoose).Promise = global.Promise;
  await mongoose.connection.close();
  await mongoose.connect(MongoURL);
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
}
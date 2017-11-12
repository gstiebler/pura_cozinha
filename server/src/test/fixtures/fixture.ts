import * as mongoose from 'mongoose';
import { init, MongoURL } from '../../db';
import kitchenFixtures from './kitchen';
import menuItemFixtures from './menuItem';
import OrderFixtures from './Order';
import UserFixtures from './UserFixtures';

const MONGOOSE_DISCONNECTED = 0;

export default async function execute() {
  /*mongoose.connection.on('disconnected', () => console.log('disconnected'));
  mongoose.connection.on('connected', () => console.log('connected'));
  mongoose.connection.on('connecting', () => console.log('connecting'));
  mongoose.connection.on('disconnecting', () => console.log('disconnecting'));*/
  await resetDb();
  await UserFixtures();
  await menuItemFixtures();
  await kitchenFixtures();
  await OrderFixtures();
}

async function resetDb() {
  await dropDb();
  await init();
};

async function dropDb() {
  (<any>mongoose).Promise = global.Promise;
  if (mongoose.connection.readyState !== MONGOOSE_DISCONNECTED) {
    await mongoose.disconnect();
  }
  await mongoose.connect(MongoURL, { useMongoClient: true });
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
}
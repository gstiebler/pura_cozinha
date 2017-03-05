import * as mongoose from 'mongoose';
import { init, testURL } from '../../db';
import kitchenFixtures from './kitchen';

export default async function execute() {
  await resetDb();
  await kitchenFixtures();
}

async function resetDb() {
  await dropDb();
  await init();
};

async function dropDb() {
  await mongoose.connection.close();
  await mongoose.connect(testURL);
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
}
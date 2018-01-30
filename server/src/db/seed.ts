import * as dotenv from 'dotenv';
import { initFixtures } from '../../../server/src/test/fixtures/fixture';
import * as MongoInit from '../db/index';

export async function seed() {
  dotenv.config();
  await MongoInit.init({
    dbHost: process.env.MONGODB_HOST,
    dbName: process.env.MONGODB_DB_NAME,
    port: process.env.MONGODB_PORT,
  });
  if(process.env.NODE_ENV !== 'development') {
    console.log('Not allowed on ' + process.env.NODE_ENV);
  } else {
    try {
      await initFixtures();
      console.log('All data seeded');
    } catch(err) {
      console.error(err);
    }
  }
}

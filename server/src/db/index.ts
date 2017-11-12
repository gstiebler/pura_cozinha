import * as mongoose from 'mongoose';
import * as assert from 'assert';
import config from './config';

const dbHost = process.env.DB_HOST;
const dbName = config[process.env.NODE_ENV].dbName;
const PORT = '27017';
export const MongoURL = `mongodb://${dbHost}:${PORT}/${dbName}`;

export async function init() {
  (<any>mongoose).Promise = global.Promise;

  await mongoose.disconnect();

  const options = {
    useMongoClient: true
  };
  const db = await mongoose.connect(MongoURL, options);
}

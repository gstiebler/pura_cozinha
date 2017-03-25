import * as mongoose from 'mongoose';
import * as assert from 'assert';
import config from './config';

const dbName = config[process.env.NODE_ENV].dbName;
export const MongoURL = 'mongodb://localhost:27017/' + dbName;

export async function init() {
  (<any>mongoose).Promise = global.Promise;

  await mongoose.connection.close();

  const options = {
    server: {
      socketOptions: { socketTimeoutMS: 10000 }
    }
  };
  await mongoose.connect(MongoURL, options);
}

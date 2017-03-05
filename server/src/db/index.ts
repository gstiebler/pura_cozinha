import * as mongoose from 'mongoose';
import * as assert from 'assert';

export const testURL = 'mongodb://localhost:27017/pura_cozinha_test';

export async function init() {
  (<any>mongoose).Promise = global.Promise;
  
  await mongoose.connection.close();

  const options = {
    server: {
      socketOptions: { socketTimeoutMS: 10000 }
    }
  };
  await mongoose.connect(testURL, options);
}

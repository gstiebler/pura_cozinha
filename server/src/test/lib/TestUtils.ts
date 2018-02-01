import * as mongoose from 'mongoose';
import * as winston from 'winston';
import * as dotenv from 'dotenv';
import * as sinon from 'sinon';
import * as http from 'http';
import * as _ from 'lodash';
import * as MongoInit from '../../db/index';
import { execGQLQuery } from '../../graphql/graphql_controller';
import app from './../../app';
import * as chaiAsPromised from 'chai-as-promised';
import * as chai from 'chai';
const network = require('../../../../ConsumerWebApp/src/lib/network');
chai.use(chaiAsPromised);

dotenv.config();

export async function idByValue(model: mongoose.Model<mongoose.Document>,
                                fieldName: string,
                                value: any): Promise<string> {
  const record = await model.findOne({ [fieldName]: value });
  if (!record) {
    throw new Error(`Item not found: ${fieldName}, ${value}, ${model.modelName}`);
  }
  return record._id;
}

let fetchStub;
before(async () => {
  fetchStub = sinon.stub(network, 'fetchQuery', queryFn);
  await MongoInit.init({
    dbHost: process.env.MONGODB_HOST,
    dbName: process.env.MONGODB_TEST_DB_NAME,
    port: process.env.MONGODB_PORT,
  });
});

after((done) => {
  mongoose.disconnect(done);
  fetchStub.restore();
});

if (process.env.LOG_LEVEL) {
  winston.default.transports.console.level = process.env.LOG_LEVEL;
}

async function queryFn(query: string) {
  const res = await execGQLQuery(query);
  if (_.isEmpty(res.errors)) {
    return res.data;
  }
  throw new Error(JSON.stringify(res.errors, null, 2));
}

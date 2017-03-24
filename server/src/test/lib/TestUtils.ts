import * as mongoose from 'mongoose';
import * as winston from 'winston';
import * as http from 'http';
import app from './../../app';

const port = '4000';
export const baseURL = 'http://localhost:' + port + '/graphql';

export async function idByValue(model: mongoose.Model<mongoose.Document>,
                                fieldName: string,
                                value: any): Promise<string> {
  const record = await model.findOne({ [fieldName]: value });
  return record._id;
}

export function createServer() {
  const server = http.createServer(app);
  server.listen(port);
  server.on('error', (err) => {
    winston.error(err.stack);
  });
  return server;
}
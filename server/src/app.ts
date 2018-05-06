import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as logger from 'winston';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as MongoInit from './db/index';
import { schema } from './graphql/graphql_controller';
import * as db from './db';
import { initializeTwitter } from './lib/Twitter';
import OrderRoutes from './routes/OrderRoutes';
import * as mongoose from 'mongoose';

import * as bodyParser from 'body-parser';

// load environment variables from .env file in the root of the project (where package.json is)
dotenv.config();

MongoInit.init({
  dbHost: process.env.MONGODB_HOST,
  dbName: process.env.MONGODB_DB_NAME,
  port: process.env.MONGODB_PORT,
});

mongoose.set( "debug", function(coll, method, query, doc, options) {
  if (method === 'ensureIndex') { return }
  const ObjectId                   = require('mongoose').Types.ObjectId;
  function formatter (key, value) {
    if (this[key] instanceof ObjectId) {
      return `!*ObjectId('${value}')!*`;
    } else if (this[key] instanceof Date) {
      return `!*ISODate('${value}')!*`;
    }
    return value;
  }
  let strQuery = JSON.stringify(query, formatter, 2);
  if (strQuery.length > 10000) {
    strQuery = `${strQuery.substr(0, 1000)} **cut ${strQuery.length} ** ${strQuery.slice(-1000)}`;
  }

  console.log(`db.${coll}.${method}( ${strQuery} )`);
  console.log(' *** doc: ' + JSON.stringify(doc, null, 2));
} );

const app = express();

const HTTP_CODES = {
  success : 200,
  notFound : 404,
  error: 500,
};

// log requests
app.use(bodyParser.json());
app.use(function(req, res, next) {
  logger.debug(req.body);
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack,
    path: error.path
  })
}));

OrderRoutes(app);


const webAdminDir = path.join(__dirname, '/../../../WebAdminApp/');
const distDirName = webAdminDir + 'dist';
app.use('/admin_app', express.static(distDirName));
app.get('/admin_app/*', function (req, res) {
  logger.debug(req.url);
  return res.redirect('/admin_app');
  // return res.redirect('/cozinha?url=' + encodeURIComponent(req.url));
});


const consumerWebAppDir = path.join(__dirname, '/../../../ConsumerWebApp/');
const cwaDistDirName = consumerWebAppDir + 'dist';
app.use('/', express.static(cwaDistDirName));

const kitchenWebAppDir = path.join(__dirname, '/../../../KitchenWebApp/');
const kwaDistDirName = kitchenWebAppDir + 'dist';
app.use('/cozinha', express.static(kwaDistDirName));

app.get('/cozinha/*', function (req, res) {
  logger.debug(req.url);
  return res.redirect('/cozinha');
  // return res.redirect('/cozinha?url=' + encodeURIComponent(req.url));
});

app.use(function(error, req, res, next) {
  logger.debug(req);
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const err = new Error('Not Found');
  (err as any).status = HTTP_CODES.notFound;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || HTTP_CODES.error);
    res.render('error', {
      error: err,
      message: err.message,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || HTTP_CODES.error);
  res.render('error', {
    error: {},
    message: err.message,
  });
});

process.on('uncaughtException', (err) => {
  logger.error(err.stack);
});

initializeTwitter();

export default app;

import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as winston from 'winston';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as MongoInit from './db/index';
import { schema } from './graphql/graphql_controller';
import * as db from './db';

import * as bodyParser from 'body-parser';

// load environment variables from .env file in the root of the project (where package.json is)
dotenv.config();

MongoInit.init({
  dbHost: process.env.MONGODB_HOST,
  dbName: process.env.MONGODB_DB_NAME,
  port: process.env.MONGODB_PORT,
});

const app = express();

const HTTP_CODES = {
  success : 200,
  notFound : 404,
  error: 500,
};

// log requests
app.use(bodyParser.json());
if (process.env.SHOW_GRAPHQL_QUERIES) {
  app.use(function(req, res, next) {
    winston.info(req.body);
    next();
  });
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

/*
const webAdminDir = path.join(__dirname, '/../../WebAdmin/');
const distDirName = webAdminDir + 'dist';
app.use('/admin_app', express.static(distDirName));
app.use('/admin_app/ext_libs', express.static(webAdminDir + 'node_modules'));
app.get('/admin_app/*', function (req, res) {
  console.log(req.url);
  return res.redirect('/admin_app/?url=' + encodeURIComponent(req.url));
});
*/

const consumerWebAppDir = path.join(__dirname, '/../../../ConsumerWebApp/');
const cwaDistDirName = consumerWebAppDir + 'dist';
app.use('/', express.static(cwaDistDirName));

/*
app.get('/*', function (req, res) {
  console.log(req.url);
  return res.redirect('/?url=' + encodeURIComponent(req.url));
});
*/

app.use(function(error, req, res, next) {
  console.log(req);
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
  winston.error(err.stack);
});

export default app;
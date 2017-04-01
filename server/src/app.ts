import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as winston from 'winston';
import * as path from 'path';

import { schema } from './graphql/graphql_controller';
import * as db from './db';

import * as bodyParser from 'body-parser';

db.init();

const app = express();

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

const webAdminDir = path.join(__dirname, '/../../WebAdmin/');
const distDirName = webAdminDir + 'dist';
app.use('/admin_app', express.static(distDirName));
app.use('/admin_app/ext_libs', express.static(webAdminDir + 'node_modules'));
app.get('/admin_app/*', function (req, res) {
  console.log(req.url);
  return res.redirect('/admin_app/?url=' + encodeURIComponent(req.url));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req: express.Request, res: express.Response) {
    winston.error(err.stack);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req: express.Request, res: express.Response) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


process.on('uncaughtException', function (err) {
    winston.error(err.stack);
});

export default app;
import app from './app';
import * as winston from 'winston';

const port = process.env.PORT || '3000';
app.listen(port, function () {
  winston.info('Server listening on port ' + port);
});
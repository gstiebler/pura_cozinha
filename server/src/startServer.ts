import app from './app';
import * as winston from 'winston';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';

import * as TelegramServer from './KitchenTelegram/server';

const port = process.env.PORT || '3000';
const HTTPSport = 443;

const privateKey  = fs.readFileSync('./sslcert/ca.key', 'utf8');
const certificate = fs.readFileSync('./sslcert/ca.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

httpServer.listen(port, () => {
  winston.info('Server listening on port ' + port);
});

/*
httpsServer.listen(HTTPSport, () => {
  winston.info('Server listening HTTPS on port ' + HTTPSport);
});
*/

TelegramServer.startServer(process.env.TELEGRAM_TOKEN);
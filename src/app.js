import express from 'express';
import path from 'path';
// import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import http from 'http';
import Debug from 'debug';
import routes from './routes';

if (process.env.NODE_ENV == 'production') {
  require('babel-polyfill');
}

require('dotenv-flow').config();

const app = express();
const server = http.Server(app);
const debug = new Debug('api/app.js');

app.use(function(req, res, next) {
  if (process.env.NODE_ENV && process.env.NODE_ENV == 'test') {
    req.settings = require('./test/config/settings');
  } else {
    req.settings = require('./config/settings');
  }
  return next();
});

// cache control error 304
app.disable('etag');

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type ,Authorization, Accept, X-File-Name , x-access-token, x-accepted-format'
  );
  next();
});

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
  })
);
debug(routes);
app.use('/api', routes);

app.use('/images', express.static(path.join(__dirname, '/../images')));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '/../www')));
  app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, '/../www/index.html'))
  );
}

export { app, server };

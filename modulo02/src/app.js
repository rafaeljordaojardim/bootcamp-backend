import 'dotenv/config';
import path from 'path';
import * as Sentry from '@sentry/node';
import express from 'express';
import Youch from 'youch';
import sentryConfig from './config/sentry';
import 'express-async-errors';

const routes = require('./routes');

require('./database');

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        res.status(500).json(errors);
      }
      res.status(500).json({ error: 'Internal server error' });
    });
  }
} /* App */

module.exports = new App().server;

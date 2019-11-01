import express from 'express';
import routes from './routes';

require('./database/index');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
} // app

export default new App().server;

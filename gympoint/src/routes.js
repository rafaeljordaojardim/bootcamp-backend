import SessionController from './app/controllers/SessionController';

const { Router } = require('express');

const routes = Router();

routes.get('/session', SessionController.store);

export default routes;

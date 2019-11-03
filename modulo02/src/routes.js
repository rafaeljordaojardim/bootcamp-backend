const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const FileController = require('./app/controllers/FileController');
const authMiddleware = require('./app/middlewares/auth');
import multer from 'multer';
import multerConfig from './config/multer';
import ProviderController from './app/controllers/ProviderController';
const upload = multer(multerConfig);
const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);
routes.use(authMiddleware);

routes.get('/providers', ProviderController.index);
routes.patch('/users', UserController.update);
 routes.post('/files', upload.single('file'), FileController.store);
module.exports = routes;

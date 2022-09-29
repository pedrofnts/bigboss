import { Router } from 'express';
import user from './User';
import auth from './Auth';
import post from './Post';

const routes = Router();

routes.use('/', auth);
routes.use('/', user);
routes.use('/', post);

export default routes;
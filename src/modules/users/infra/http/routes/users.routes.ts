import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersControllers';
import UserPasswordController from '../controllers/UserPasswordController';

const usersRouter = Router();

const usersController = new UsersController();
const userPasswordController = new UserPasswordController();

usersRouter.post('/', usersController.create);
usersRouter.post('/find', ensureAuthenticated, usersController.show);
usersRouter.post('/reset', ensureAuthenticated, userPasswordController.update);
usersRouter.put('/', ensureAuthenticated, usersController.update);
usersRouter.delete('/', ensureAuthenticated, usersController.delete);

export default usersRouter;

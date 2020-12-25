import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersControllers';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.post('/find', ensureAuthenticated, usersController.show);

export default usersRouter;

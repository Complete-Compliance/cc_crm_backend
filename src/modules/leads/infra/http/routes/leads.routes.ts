/*
NOT PRIORITY - AFTER FRONTEND ONLY
-> []study how to get only first 20, for example. maybe with query params
* maybe create another controller that handles this
*/

import { Router } from 'express';

import LeadsController from '../controllers/LeadsController';

const leadsRouter = Router();
const leadsController = new LeadsController();

leadsRouter.post('/', leadsController.create);
leadsRouter.put('/:id', leadsController.update);
leadsRouter.delete('/:id', leadsController.delete);
leadsRouter.get('/:id', leadsController.show);
leadsRouter.get('/', leadsController.index);

export default leadsRouter;

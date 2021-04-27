/*
NOT PRIORITY - AFTER FRONTEND ONLY
-> []study how to get only first 20, for example. maybe with query params
* maybe create another controller that handles this
*/

import { Router } from 'express';

import LeadsController from '../controllers/LeadsController';
import LeadsDOTController from '../controllers/LeadsDOTController';
import DOTController from '../controllers/DOTController';

const leadsRouter = Router();

const leadsController = new LeadsController();
const leadsDOTController = new LeadsDOTController();
const dotController = new DOTController();

leadsRouter.post('/', leadsController.create);
leadsRouter.put('/:id', leadsController.update);
leadsRouter.delete('/:id', leadsController.delete);
leadsRouter.get('/find', leadsDOTController.show);
leadsRouter.get('/:id', leadsController.show);
leadsRouter.get('/', leadsController.index);
leadsRouter.get('/count/all', leadsController.count);
leadsRouter.get('/find/highestDOT', dotController.show);

export default leadsRouter;

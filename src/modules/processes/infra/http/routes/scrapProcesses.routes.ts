import { Router } from 'express';
import ScrapByRangeController from '../controllers/ScrapByRangeController';
import ScrapProcessController from '../controllers/ScrapProcessController';
import UpdateRunningProcessController from '../controllers/UpdateRunningProcessController';

const scrapProcessesRouter = Router();

const scrapProcessesController = new ScrapProcessController();
const scrapByRangeController = new ScrapByRangeController();
const updateRunningProcessController = new UpdateRunningProcessController();

scrapProcessesRouter.post('/', scrapProcessesController.create);
scrapProcessesRouter.post('/scrap/:id', scrapByRangeController.handle);
scrapProcessesRouter.put('/', scrapProcessesController.update);
scrapProcessesRouter.put('/running', updateRunningProcessController.handle);
scrapProcessesRouter.get('/', scrapProcessesController.index);
scrapProcessesRouter.delete('/:id', scrapProcessesController.delete);

export default scrapProcessesRouter;

import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import leadsRouter from '@modules/leads/infra/http/routes/leads.routes';
import scrapProcessesRouter from '@modules/processes/infra/http/routes/scrapProcesses.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/leads', leadsRouter);
routes.use('/scrapProcesses', scrapProcessesRouter);

export default routes;

import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ILeadsRepository from '@modules/leads/repositories/ILeadsRepository';
import LeadsRepository from '@modules/leads/infra/typeorm/repositories/LeadsRepository';

import IScrapProcessesRepository from '@modules/processes/repositories/IScrapProcessesRepository';
import ScrapProcessesRepository from '@modules/processes/infra/typeorm/repositories/ScrapProcessesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ILeadsRepository>(
  'LeadsRepository',
  LeadsRepository,
);

container.registerSingleton<IScrapProcessesRepository>(
  'ScrapProcessesRepository',
  ScrapProcessesRepository,
);

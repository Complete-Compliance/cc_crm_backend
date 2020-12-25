import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ILeadsRepository from '@modules/leads/repositories/ILeadsRepository';
import LeadsRepository from '@modules/leads/infra/typeorm/repositories/LeadsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ILeadsRepository>(
  'LeadsRepository',
  LeadsRepository,
);

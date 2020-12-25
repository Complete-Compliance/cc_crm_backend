import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  email?: string | undefined;
  login?: string | undefined;
}

@injectable()
export default class FindUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, login }: Request): Promise<User | undefined> {
    if (!email && !login) {
      throw new AppError('Both search criteria are undefined');
    }

    let user;
    if (email) {
      user = await this.usersRepository.findByEmail(email);

      if (user) {
        return user;
      }
    }
    if (login) {
      user = await this.usersRepository.findByLogin(login);

      if (user) {
        return user;
      }
    }

    return user || undefined;
  }
}

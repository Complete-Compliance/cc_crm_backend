import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  name: string;
  email: string;
  login: string;
  type?: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    login,
    type = 'user',
    password,
  }: Request): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already in use');
    }

    const loginExists = await this.usersRepository.findByLogin(login);

    if (loginExists) {
      throw new AppError('Login already in use');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      login,
      type,
      password: hashedPassword,
    });

    return user;
  }
}

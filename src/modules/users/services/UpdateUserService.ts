import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  id: string;
  email?: string;
  name?: string;
  login?: string;
  password?: string;
  oldPassword?: string;
  passwordConfirmation?: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    email = '',
    name = '',
    login = '',
    password = '',
    oldPassword = '',
    passwordConfirmation = '',
  }: Request): Promise<User> {
    if (
      !email &&
      !name &&
      !login &&
      !password &&
      !oldPassword &&
      !passwordConfirmation
    ) {
      throw new AppError(
        "All fields to update are empty. Can't update nothing.",
      );
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('No user found with given ID.');
    }

    // verifications for email update
    if (email) {
      const userWithEmailExists = await this.usersRepository.findByEmail(email);

      if (userWithEmailExists) {
        throw new AppError('This e-mail is already in use');
      }

      user.email = email;
    }

    if (login) {
      const userWithLoginExists = await this.usersRepository.findByLogin(login);

      if (userWithLoginExists) {
        throw new AppError('This login is already in use');
      }

      user.login = login;
    }

    if (password) {
      if (password && (!oldPassword || !passwordConfirmation)) {
        throw new AppError(
          "Can't update password without oldPassword and a new password confirmation.",
        );
      }

      if (!(await this.hashProvider.compareHash(oldPassword, user.password))) {
        throw new AppError("Old Password don't match");
      }

      if (password !== passwordConfirmation) {
        throw new AppError("New password and it's confirmation don't match");
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    if (name) {
      user.name = name;
    }

    await this.usersRepository.save(user);

    return user;
  }
}

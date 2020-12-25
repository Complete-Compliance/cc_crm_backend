import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      password: 'somepass',
    });

    const response = await authenticateUser.execute({
      login: 'johndoe',
      password: 'somepass',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate an user with wrong login', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      password: 'somepass',
    });

    expect(
      authenticateUser.execute({
        login: 'wronglogin',
        password: 'somepass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with a wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      password: 'somepass',
    });

    expect(
      authenticateUser.execute({
        login: 'johndoe',
        password: 'wrongpass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

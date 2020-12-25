import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      type: 'admin',
      password: 'somepass',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be able to assign "user" type when type is not specified', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      password: 'somepass',
    });

    expect(user.type).toBe('user');
  });

  it('should not be able to create a new user with an existing email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      type: 'admin',
      password: 'somepass',
    });

    expect(
      createUser.execute({
        name: 'Another John Doe',
        email: 'johndoe@example.com',
        login: 'anotherJohnDoe',
        type: 'admin',
        password: 'somepass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with an existing login', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      type: 'admin',
      password: 'somepass',
    });

    expect(
      createUser.execute({
        name: 'Another John Doe',
        email: 'anotherjohndoe@example.com',
        login: 'johndoe',
        type: 'admin',
        password: 'somepass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

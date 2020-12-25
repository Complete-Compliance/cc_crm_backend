import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FindUserService from './FindUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let findUser: FindUserService;

describe('FindUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    findUser = new FindUserService(fakeUsersRepository);
  });

  it('should be able to find an user by login and email', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      type: 'admin',
      password: 'somepass',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe 2',
      email: 'johndoe2@example.com',
      login: 'johndoe2',
      type: 'user',
      password: 'somepass2',
    });

    const foundUserByLogin = await findUser.execute({
      email: undefined,
      login: user1.login,
    });
    const foundUserByEmail = await findUser.execute({
      email: user2.email,
      login: undefined,
    });

    expect(user1).toEqual(foundUserByLogin);
    expect(user2).toEqual(foundUserByEmail);
  });

  it('should return undefined when no user is found', async () => {
    const foundUser = await findUser.execute({
      login: 'something',
      email: 'something@else.com',
    });

    expect(foundUser).toBe(undefined);
  });

  it('should not be able to find an user without both email and login', async () => {
    await expect(
      findUser.execute({ login: undefined, email: undefined }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

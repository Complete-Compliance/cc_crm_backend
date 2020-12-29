import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import UpdateUserService from './UpdateUserService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUser: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUser = new UpdateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update an user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      type: 'admin',
      password: 'somepass',
    });

    const updatedUser = await updateUser.execute({
      id: user.id,
      login: 'DoeJohn',
      name: 'DoeJohn',
      email: 'another@email.com',
      password: 'otherpass',
      passwordConfirmation: 'otherpass',
      oldPassword: 'somepass',
    });

    expect(updatedUser.id).toBe(user.id);
    expect(updatedUser.login).toBe('DoeJohn');
  });

  it('should be able to update an user and not its password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      type: 'admin',
      password: 'somepass',
    });

    const updatedUser = await updateUser.execute({
      id: user.id,
      login: 'DoeJohn',
      name: 'DoeJohn',
      email: 'another@email.com',
    });

    expect(updatedUser.id).toBe(user.id);
    expect(updatedUser.login).toBe('DoeJohn');
  });

  it('should be able to update an user and not its name', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      type: 'admin',
      password: 'somepass',
    });

    const updatedUser = await updateUser.execute({
      id: user.id,
      login: 'DoeJohn',
      email: 'another@email.com',
    });

    expect(updatedUser.id).toBe(user.id);
    expect(updatedUser.login).toBe('DoeJohn');
  });

  it('should not be able to update an user without any value', async () => {
    await expect(updateUser.execute({ id: 'anyid' })).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to update an user with a non-existing-id', async () => {
    await expect(
      updateUser.execute({
        id: 'non-existing-id',
        login: 'DoeJohn',
        name: 'DoeJohn',
        email: 'another@email.com',
        password: 'otherpass',
        passwordConfirmation: 'otherpass',
        oldPassword: 'somepass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an user with an email already in use', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      type: 'admin',
      password: 'somepass',
    });

    await fakeUsersRepository.create({
      name: 'Rodrigo Alvarez',
      email: 'another@example.com',
      login: 'ralvez',
      type: 'user',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        id: user.id,
        login: 'DoeJohn',
        name: 'DoeJohn',
        email: 'another@example.com',
        password: 'otherpass',
        passwordConfirmation: 'otherpass',
        oldPassword: 'somepass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an user with an login already in use', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      type: 'admin',
      password: 'somepass',
    });

    await fakeUsersRepository.create({
      name: 'Rodrigo Alvarez',
      email: 'another@example.com',
      login: 'ralvez',
      type: 'user',
      password: '123456',
    });

    await expect(
      updateUser.execute({
        id: user.id,
        login: 'ralvez',
        name: 'DoeJohn',
        email: 'email@example.com',
        password: 'otherpass',
        passwordConfirmation: 'otherpass',
        oldPassword: 'somepass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an user password without giving both old password and new password confirmation', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      type: 'admin',
      password: 'somepass',
    });

    await expect(
      updateUser.execute({
        id: user.id,
        password: 'otherpass',
        passwordConfirmation: 'otherpass',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      updateUser.execute({
        id: user.id,
        password: 'otherpass',
        oldPassword: 'somepass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an user password with a wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      type: 'admin',
      password: 'somepass',
    });

    await expect(
      updateUser.execute({
        id: user.id,
        password: 'otherpass',
        passwordConfirmation: 'otherpass',
        oldPassword: 'otherpass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an user password with a wrong password confirmation', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      type: 'admin',
      password: 'somepass',
    });

    await expect(
      updateUser.execute({
        id: user.id,
        password: 'otherpass',
        passwordConfirmation: 'somepass',
        oldPassword: 'somepass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

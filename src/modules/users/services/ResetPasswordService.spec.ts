import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import ResetPasswordService from './ResetPasswordService';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
      type: 'user',
    });

    await resetPassword.execute({
      password: '123123',
      passwordConfirmation: '123123',
      id: user.id,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not reset password when passwordConfirmation is wrong', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      login: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
      type: 'user',
    });

    await expect(
      resetPassword.execute({
        password: '123123',
        passwordConfirmation: '123121113',
        id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not reset password from a non-existing user', async () => {
    await expect(
      resetPassword.execute({
        password: '123123',
        passwordConfirmation: '123123',
        id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

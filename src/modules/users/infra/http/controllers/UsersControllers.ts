import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import FindUserService from '@modules/users/services/FindUserService';
import DeleteUserByIdService from '@modules/users/services/DeleteUserByIdService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, login, type, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      login,
      type,
      password,
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
      name,
      email,
      login,
      password,
      oldPassword,
      passwordConfirmation,
    } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      email,
      login,
      password,
      oldPassword,
      passwordConfirmation,
    });

    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteUserById = container.resolve(DeleteUserByIdService);

    await deleteUserById.execute(id);

    return response.status(204).json();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { email, login } = request.body;

    const findUser = container.resolve(FindUserService);

    const user = await findUser.execute({
      email,
      login,
    });

    return response.json(classToClass(user));
  }
}

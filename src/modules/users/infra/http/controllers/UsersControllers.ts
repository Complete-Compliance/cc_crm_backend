import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import FindUserService from '@modules/users/services/FindUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    console.log(`PAYLOAD: ${request.body}`);
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

  public async show(request: Request, response: Response): Promise<Response> {
    console.log(`PAYLOAD: ${request.body}`);
    const { email, login } = request.body;

    const findUser = container.resolve(FindUserService);

    const user = await findUser.execute({
      email,
      login,
    });

    return response.json(classToClass(user));
  }
}

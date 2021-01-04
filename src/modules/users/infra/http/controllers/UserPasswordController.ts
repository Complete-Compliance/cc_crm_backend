import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class UserPasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { password, passwordConfirmation, id } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    const user = await resetPassword.execute({
      password,
      passwordConfirmation,
      id,
    });

    return response.json(user);
  }
}

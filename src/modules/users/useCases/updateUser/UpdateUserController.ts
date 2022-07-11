import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  async execute(request: Request, response: Response) {
    const { user_id } = request.user
    const { name, email, old_password, password } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const userUpdated = await updateUserUseCase.execute({
      user_id,
      name,
      email,
      old_password,
      password
    });

    // @ts-expect-error
    delete userUpdated.password

    return response.status(201).json(userUpdated);
  }
}

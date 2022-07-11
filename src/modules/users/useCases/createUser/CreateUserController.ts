import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async execute(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      password
    });

    // @ts-expect-error
    delete user.password

    return response.status(201).json(user);
  }
}

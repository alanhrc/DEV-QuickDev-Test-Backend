import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAllPostsUseCase } from './GetAllPostsUseCase';

export class GetAllPostsController {
  async execute(request: Request, response: Response) {
    const { user_id } = request.user

    const getAllPostsUseCase = container.resolve(GetAllPostsUseCase);

    const postUpdated = await getAllPostsUseCase.execute(user_id);

    return response.status(200).json(postUpdated);
  }
}

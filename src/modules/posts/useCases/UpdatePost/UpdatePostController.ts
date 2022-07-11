import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdatePostUseCase } from './UpdatePostUseCase';

export class UpdatePostController {
  async execute(request: Request, response: Response) {
    const { user_id } = request.user
    const { post_id } = request.params
    const { title, description } = request.body;

    const updatePostUseCase = container.resolve(UpdatePostUseCase);

    const postUpdated = await updatePostUseCase.execute({
      user_id,
      post_id,
      title,
      description
    });

    return response.status(200).json(postUpdated);
  }
}

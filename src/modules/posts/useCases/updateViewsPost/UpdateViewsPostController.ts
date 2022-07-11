import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateViewsPostUseCase } from './UpdateViewsPostUseCase';

export class UpdateViewsPostController {
  async execute(request: Request, response: Response) {
    const { user_id } = request.user
    const { post_id } = request.params

    const updateViewsPostUseCase = container.resolve(UpdateViewsPostUseCase);

    const postUpdated = await updateViewsPostUseCase.execute({
      user_id,
      post_id,
    });

    return response.status(200).json(postUpdated);
  }
}

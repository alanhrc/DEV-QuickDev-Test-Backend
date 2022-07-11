import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { LikeOrDislikePostUseCase } from './LikeOrDislikePostUseCase';

export class LikeOrDislikePostController {
  async execute(request: Request, response: Response) {
    const { user_id } = request.user
    const { post_id } = request.params
    const { like } = request.body;

    const likeOrDislikePostUseCase = container.resolve(LikeOrDislikePostUseCase);

    const postUpdated = await likeOrDislikePostUseCase.execute({
      user_id,
      post_id,
      like
    });

    return response.status(200).json(postUpdated);
  }
}

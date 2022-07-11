import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCommentUseCase } from "./CreateCommentUseCase";

export class CreateCommentController {
  async execute(request: Request, response: Response) {
    const { user_id } = request.user
    const { post_id } = request.params
    const { description } = request.body

    const createCommentUseCase = container.resolve(CreateCommentUseCase);

    const comment = await createCommentUseCase.execute({
      post_id,
      user_id,
      description
    })

    return response.status(201).json(comment)
  }
}

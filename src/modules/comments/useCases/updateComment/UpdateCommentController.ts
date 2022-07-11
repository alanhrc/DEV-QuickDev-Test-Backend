import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCommentUseCase } from "./UpdateCommentUseCase";

export class UpdateCommentController {
  async execute(request: Request, response: Response) {
    const { user_id } = request.user
    const { comment_id } = request.params
    const { description } = request.body

    const updateCommentUseCase = container.resolve(UpdateCommentUseCase);

    const comment = await updateCommentUseCase.execute({
      comment_id,
      user_id,
      description
    })

    return response.status(201).json(comment)
  }
}

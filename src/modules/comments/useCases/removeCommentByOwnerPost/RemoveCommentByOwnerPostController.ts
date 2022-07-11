import { Request, Response } from "express";
import { container } from "tsyringe";

import { RemoveCommentByOwnerPostUseCase } from "./RemoveCommentByOwnerPostUseCase";

export class RemoveCommentByOwnerController {
  async execute(request: Request, response: Response) {
    const { user_id } = request.user
    const { comment_id } = request.params

    const removeCommentByOwnerPostUseCase = container.resolve(RemoveCommentByOwnerPostUseCase);

    const comment = await removeCommentByOwnerPostUseCase.execute({
      comment_id,
      user_id
    })

    return response.status(201).json(comment)
  }
}

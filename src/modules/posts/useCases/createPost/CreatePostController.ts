import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePostUseCase } from "./CreatePostUseCase";

export class CreatePostController {
  async execute(request: Request, response: Response) {
    const { user_id } = request.user
    const { title, description } = request.body

    const createPostUseCase = container.resolve(CreatePostUseCase);

    const post = await createPostUseCase.execute({
      user_id,
      title,
      description
    })

    return response.status(201).json(post)
  }
}

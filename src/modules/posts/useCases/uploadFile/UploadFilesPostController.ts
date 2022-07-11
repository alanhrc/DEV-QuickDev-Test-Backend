import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadFilesPostUseCase } from './UploadFilesPostUseCase';

export class UploadFilesPostController {
  async execute(request: Request, response: Response) {
    const { user_id } = request.user
    const { post_id } = request.params

    return response.json(request.files)

    const uploadFilesPostUseCase = container.resolve(UploadFilesPostUseCase);

    await uploadFilesPostUseCase.execute({
      user_id,
      post_id,
      files: request.files as Express.Multer.File[]
    });

    return response.status(201).send();
  }
}

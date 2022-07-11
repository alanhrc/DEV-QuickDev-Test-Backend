import  'reflect-metadata'
import { UploadedFiles as UploadedFile } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { IUsersRepository } from '../../../users/repositories/IUsersRepository';

import { IUploadFilesPostDTO } from '../../dtos/IUploadFilesPostDTO';
import { IPostsRepository } from '../../repositories/IPostsRepository';

import { IUploadedFilesRepository } from '../../../uploadFiles/repositories/IUploadedFilesRepository';

@injectable()
export class UploadFilesPostUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UploadedFilesRepository')
    private uploadedFilesRepository: IUploadedFilesRepository,
  ) {}

  async execute({ user_id, post_id, files }: IUploadFilesPostDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found!', 401);
    }

    const post = await this.postsRepository.findById(post_id)

    if (!post) {
      throw new AppError('Post not found!', 401);
    }

    if(user.id !== post.user_id) {
      throw new AppError('Only owner post can be upload files!', 401);
    }

    if (files && files.length > 0) {
      files.map(async file => {
        await this.uploadedFilesRepository.create({
          post_id: post.id,
          path: file.filename
        })
      })
    }
  }
}

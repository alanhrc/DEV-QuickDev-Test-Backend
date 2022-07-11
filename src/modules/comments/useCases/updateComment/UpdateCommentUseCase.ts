import  'reflect-metadata'
import { Comments as Comment } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { AppError } from '../../../../shared/errors/AppError';

import { IUsersRepository } from '../../../users/repositories/IUsersRepository';

import { IUpdateCommentDTO } from '../../dtos/IUpdateCommentDTO';
import { ICommentsRepository } from '../../repositories/ICommentsRepository';

@injectable()
export class UpdateCommentUseCase {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ comment_id, user_id, description }: IUpdateCommentDTO): Promise<Comment> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can write comments', 401)
    }

    const comment = await this.commentsRepository.findById(comment_id)

    if (!comment) {
      throw new AppError('Comment does not exists!', 400)
    }

    if (user.id !== comment.user_id) {
      throw new AppError('Only owner comment can update it!', 401)
    }

    comment.description = description

    const commentUpdated = await this.commentsRepository.update(comment)

    return commentUpdated
  }
}

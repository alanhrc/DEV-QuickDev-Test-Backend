import  'reflect-metadata'
import { Comments as Comment } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { AppError } from '../../../../shared/errors/AppError';

import { IUsersRepository } from '../../../users/repositories/IUsersRepository';

import { IRemoveCommentByOwnerPostDTO } from '../../dtos/IRemoveCommentByOwnerPostDTO';
import { ICommentsRepository } from '../../repositories/ICommentsRepository';
import { IPostsRepository } from '../../../posts/repositories/IPostsRepository';

@injectable()
export class RemoveCommentByOwnerPostUseCase {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  async execute({ comment_id, user_id }: IRemoveCommentByOwnerPostDTO): Promise<Comment> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can remove comments', 401)
    }

    const comment = await this.commentsRepository.findById(comment_id)

    if (!comment || !comment.post_id) {
      throw new AppError('Comment does not exists!', 400)
    }

    const post = await this.postsRepository.findById(comment.post_id)

    if (user.id !== post?.user_id) {
      throw new AppError('Only owner comment and owner post can remove it!', 401)
    }

    const commentUpdated = await this.commentsRepository.removeOwnerPost(comment_id)

    return commentUpdated
  }
}

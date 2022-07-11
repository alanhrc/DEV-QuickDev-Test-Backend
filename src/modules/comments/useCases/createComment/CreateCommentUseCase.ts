import  'reflect-metadata'
import { Comments as Comment } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { AppError } from '../../../../shared/errors/AppError';

import { IUsersRepository } from '../../../users/repositories/IUsersRepository';

import { ICreateCommentDTO } from '../../dtos/ICreateCommentDTO';
import { ICommentsRepository } from '../../repositories/ICommentsRepository';
import { IMailProvider } from '../../../../shared/container/providers/Mail/models/IMailProvider';
import { IPostsRepository } from '../../../posts/repositories/IPostsRepository';

@injectable()
export class CreateCommentUseCase {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('EtherealMailProvider')
    private etherealMailProvider: IMailProvider,
  ) {}

  async execute({ post_id, user_id, description }: ICreateCommentDTO): Promise<Comment> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can write comments', 401)
    }

    const comment = await this.commentsRepository.create({
      post_id,
      user_id,
      description
    })

    const post = await this.postsRepository.findAndReturnEmail(post_id)
    await this.etherealMailProvider.sendMail(post || 'alancamargo50@gmail.com', 'You Received A New Comment', 'You Received A New Comment')

    return comment
  }
}

import  'reflect-metadata'
import { Posts as Post } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { IUsersRepository } from '../../../users/repositories/IUsersRepository';

import { ILikeOrDislikePostDTO } from '../../dtos/ILikeAndDislikePostDTO';
import { IPostsRepository } from '../../repositories/IPostsRepository';

@injectable()
export class LikeOrDislikePostUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  async execute({ user_id, post_id, like }: ILikeOrDislikePostDTO): Promise<Post> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found!', 401);
    }

    const post = await this.postsRepository.findById(post_id)

    if (!post) {
      throw new AppError('Post not found!', 401);
    }

    if (like === 'like') {
      post.likes = post.likes + 1
    }

    if (like === 'dislike') {
      post.dislikes = post.dislikes + 1
    }

    const postUpdated = await this.postsRepository.update(post)

    return postUpdated
  }
}

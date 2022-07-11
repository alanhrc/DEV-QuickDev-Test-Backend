import  'reflect-metadata'
import { Posts as Post } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { IUsersRepository } from '../../../users/repositories/IUsersRepository';

import { IUpdateViewsPostDTO } from '../../dtos/IUpdateViewsPostDTO';
import { IPostsRepository } from '../../repositories/IPostsRepository';

@injectable()
export class UpdateViewsPostUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  async execute({ user_id, post_id }: IUpdateViewsPostDTO): Promise<Post> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found!', 401);
    }

    const post = await this.postsRepository.findById(post_id)

    if (!post) {
      throw new AppError('Post not found!', 401);
    }

    post.views = post.views + 1

    const postUpdated = await this.postsRepository.update(post)

    return postUpdated
  }
}

import  'reflect-metadata'
import { Posts as Post } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { IUsersRepository } from '../../../users/repositories/IUsersRepository';

import { IPostsRepository } from '../../repositories/IPostsRepository';

@injectable()
export class GetAllPostsUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  async execute(user_id: string): Promise<Post[]> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found!', 401);
    }

    const posts = await this.postsRepository.getAllPosts()

    return posts
  }
}

import  'reflect-metadata'
import { Posts as Post } from '@prisma/client';
import { inject, injectable } from "tsyringe";

import { ICreatePostDTO } from '../../dtos/ICreatePostDTO';
import { IPostsRepository } from '../../repositories/IPostsRepository';

@injectable()
export class CreatePostUseCase {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  async execute({ user_id, title, description }: ICreatePostDTO): Promise<Post> {
    const post = await this.postsRepository.create({
      user_id,
      title,
      description
    })

    return post
  }
}

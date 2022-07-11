import { Posts as Post } from '@prisma/client';
import { ICreatePostDTO } from '../dtos/ICreatePostDTO';

export interface IPostsRepository {
  create: ({ user_id, title, description }: ICreatePostDTO) => Promise<Post>
  findById: (post_id: string) => Promise<Post | null>;
  findAndReturnEmail: (post_id: string) => Promise<string | null>
  update: (post: Post) => Promise<Post>
  delete: (post_id: string) => Promise<void>
  getAllPosts: () => Promise<Post[]>
}

import { uuid } from 'uuidv4';
import { Posts as Post } from '@prisma/client'

import { ICreatePostDTO } from '../../dtos/ICreatePostDTO';
import { IPostsRepository } from '../IPostsRepository';

export class PostsRepositoryInMemory implements IPostsRepository {
  private posts: Post[] = [];

  async findById(post_id: string): Promise<Post | null> {
    const findPoster = this.posts.find(post => post.id === post_id);

    return findPoster || null;
  }

  async findAndReturnEmail(post_id: string): Promise<string | null> {
    const findPoster = this.posts.find(post => post.id === post_id);

    return findPoster?.user_id || null;
  }

  async getAllPosts(): Promise<Post[]> {
    return this.posts
  }

  async create({ user_id, title, description }: ICreatePostDTO): Promise<Post> {
    const post = {
      id: uuid(),
      user_id,
      title,
      description,
      views: 0,
      likes: 0,
      dislikes: 0,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.posts.push(post);

    return post;
  }

  async update(post: Post): Promise<Post> {
    const findIndex = this.posts.findIndex(findPost => findPost.id === post.id);

    this.posts[findIndex] = post;

    return post;
  }

  public async delete(post_id: string): Promise<void> {
    const post = this.posts.findIndex(findPost => findPost.id === post_id);

    this.posts.splice(this.posts.indexOf(this.posts[post]), 1);
  }
}

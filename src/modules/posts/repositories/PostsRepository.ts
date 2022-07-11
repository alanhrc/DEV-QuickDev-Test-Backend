import { Posts as Post } from "@prisma/client";
import { prisma } from "../../../../prisma/database/prismaClient";

import { ICreatePostDTO } from "../dtos/ICreatePostDTO";
import { IPostsRepository } from "./IPostsRepository";

export class PostsRepository implements IPostsRepository {
  async findById(post_id: string): Promise<Post | null> {
    const post = await prisma.posts.findUnique({
      where: {
        id: post_id
      }
    })

    return post
  }

  async findAndReturnEmail (post_id: string): Promise<string | null> {
    const post = await prisma.posts.findUnique({
      where: {
        id: post_id
      },
      include: {
        user: true
      }
    })

    return post?.user.email || null
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await prisma.posts.findMany({
      orderBy: {
        updated_at: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        comments: true,
        uploadedFiles: true
      }
    })

    return posts
  }

  async create({ user_id, title, description }: ICreatePostDTO): Promise<Post> {
    const post = await prisma.posts.create({
      data: {
        user_id,
        title,
        description
      }
    })

    return post;
  }

  async update(post: Post): Promise<Post> {
    const postUpdated = await prisma.posts.update({
      where: {
        id: post.id
      },
      data: {
        title: post.title,
        description: post.description,
        views: post.views,
        likes: post.likes,
        dislikes: post.dislikes,
        updated_at: new Date()
      }
    })

    return postUpdated
  }

  async delete(post_id: string): Promise<void> {
    await prisma.posts.delete({
      where: {
        id: post_id
      }
    })

    return
  }
}

import { Comments as Comment } from "@prisma/client";
import { prisma } from "../../../../prisma/database/prismaClient";

import { ICreateCommentDTO } from "../dtos/ICreateCommentDTO";
import { ICommentsRepository } from "./ICommentsRepository";

export class CommentsRepository implements ICommentsRepository {
  async findById(comment_id: string): Promise<Comment | null> {
    const comment = await prisma.comments.findUnique({
      where: {
        id: comment_id
      }
    })

    return comment
  }

  async create({ post_id, user_id, description }: ICreateCommentDTO): Promise<Comment> {
    const comment = await prisma.comments.create({
      data: {
        post_id,
        user_id,
        description
      }
    })

    return comment;
  }

  async update(comment: Comment): Promise<Comment> {
    const commentUpdated = await prisma.comments.update({
      where: {
        id: comment.id
      },
      data: {
        description: comment.description,
        updated_at: new Date()
      }
    })

    return commentUpdated
  }

  async removeOwnerPost(comment_id: string): Promise<Comment> {
    const commentUpdated = await prisma.comments.update({
      where: {
        id: comment_id
      },
      data: {
        removeOwnerPost: true,
        updated_at: new Date()
      }
    })

    return commentUpdated
  }

  async delete(comment_id: string): Promise<void> {
    await prisma.comments.delete({
      where: {
        id: comment_id
      }
    })

    return
  }
}

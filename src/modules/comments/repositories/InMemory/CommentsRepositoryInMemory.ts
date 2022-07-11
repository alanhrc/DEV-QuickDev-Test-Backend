import { uuid } from 'uuidv4';
import { Comments as Comment } from '@prisma/client'

import { ICreateCommentDTO } from '../../dtos/ICreateCommentDTO';
import { ICommentsRepository } from '../ICommentsRepository';

export class CommentsRepositoryInMemory implements ICommentsRepository {
  private comments: Comment[] = [];

  async findById(comment_id: string): Promise<Comment | null> {
    const findComment = this.comments.find(comment => comment.id === comment_id);

    return findComment || null;
  }

  async create({ post_id, user_id, description }: ICreateCommentDTO): Promise<Comment> {
    const comment = {
      id: uuid(),
      post_id,
      user_id,
      description,
      removeOwnerPost: false,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.comments.push(comment);

    return comment;
  }

  async update(comment: Comment): Promise<Comment> {
    const findIndex = this.comments.findIndex(findComment => findComment.id === comment.id);

    this.comments[findIndex] = comment;

    return comment;
  }

  async removeOwnerPost(comment_id: string): Promise<Comment> {
    const findIndex = this.comments.findIndex(findComment => findComment.id === comment_id);

    this.comments[findIndex].removeOwnerPost = true;

    return this.comments[findIndex];
  }

  public async delete(comment_id: string): Promise<void> {
    const comment = this.comments.findIndex(findComment => findComment.id === comment_id);

    this.comments.splice(this.comments.indexOf(this.comments[comment]), 1);
  }
}

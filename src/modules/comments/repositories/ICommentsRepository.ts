import { Comments as Comment } from '@prisma/client';
import { ICreateCommentDTO } from '../dtos/ICreateCommentDTO';

export interface ICommentsRepository {
  create: ({ post_id, user_id, description }: ICreateCommentDTO) => Promise<Comment>
  findById: (comment_id: string) => Promise<Comment | null>;
  update: (comment: Comment) => Promise<Comment>
  removeOwnerPost: (comment_id: string) => Promise<Comment>
  delete: (comment_id: string) => Promise<void>
}

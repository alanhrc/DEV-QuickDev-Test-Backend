import { AppError } from "../../../../shared/errors/AppError";

import { UsersRepositoryInMemory } from "../../../users/repositories/InMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";

import { PostsRepositoryInMemory } from "../../../posts/repositories/InMemory/PostsRepositoryInMemory";
import { CreatePostUseCase } from "../../../posts/useCases/createPost/CreatePostUseCase";

import { CommentsRepositoryInMemory } from "../../repositories/InMemory/CommentsRepositoryInMemory";
import { CreateCommentUseCase } from "../createComment/CreateCommentUseCase";
import { UpdateCommentUseCase } from "./UpdateCommentUseCase";
import { SendMailProviderInMemory } from "../../../../shared/container/providers/Mail/inMemory/SendMailProviderInMemory";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let postsRepositoryInMemory: PostsRepositoryInMemory;
let createPostUseCase: CreatePostUseCase
let commentsRepositoryInMemory: CommentsRepositoryInMemory;
let createCommentUseCase: CreateCommentUseCase
let updateCommentUseCase: UpdateCommentUseCase
let sendMailProviderInMemory: SendMailProviderInMemory

describe('Update Comment In Post', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    postsRepositoryInMemory = new PostsRepositoryInMemory()
    commentsRepositoryInMemory= new CommentsRepositoryInMemory()
    sendMailProviderInMemory= new SendMailProviderInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
    createCommentUseCase = new CreateCommentUseCase(commentsRepositoryInMemory, usersRepositoryInMemory, postsRepositoryInMemory, sendMailProviderInMemory);
    updateCommentUseCase = new UpdateCommentUseCase(commentsRepositoryInMemory, usersRepositoryInMemory);
  });

  it('Should be able to update a comment in post', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    const post = await createPostUseCase.execute({
      user_id: user.id,
      title: 'Post very interesting',
      description: 'Description post very interesting'
    })

    const comment = await createCommentUseCase.execute({
      post_id: post.id,
      user_id: user.id,
      description: 'Description comment in post very interesting'
    })

    const commentUpdated = await updateCommentUseCase.execute({
      comment_id: comment.id,
      user_id: user.id,
      description: 'Description comment in post very interesting updated'
    })

    expect(commentUpdated.description).toBe('Description comment in post very interesting updated')
  })

  it('Should not be able to update a comment in post without login', async () => {
    await expect(updateCommentUseCase.execute({
      comment_id: 'wrong-comment-id',
      user_id: 'logout-user',
      description: 'Description comment in post very interesting'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update a comment in post without comment id', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    const post = await createPostUseCase.execute({
      user_id: user.id,
      title: 'Post very interesting',
      description: 'Description post very interesting'
    })

    await createCommentUseCase.execute({
      post_id: post.id,
      user_id: user.id,
      description: 'Description comment in post very interesting'
    })

    await expect(updateCommentUseCase.execute({
      comment_id: 'wrong-comment-id',
      user_id: user.id,
      description: 'Description comment in post very interesting'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update a comment in post without be owner comment', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    const user2 = await createUserUseCase.execute({
      name: 'Alan Henrique 2',
      email: 'alancamargo502@gmail.com',
      password: '123456',
    });

    const post = await createPostUseCase.execute({
      user_id: user.id,
      title: 'Post very interesting',
      description: 'Description post very interesting'
    })

    const comment = await createCommentUseCase.execute({
      post_id: post.id,
      user_id: user.id,
      description: 'Description comment in post very interesting'
    })

    await expect(updateCommentUseCase.execute({
      comment_id: comment.id,
      user_id: user2.id,
      description: 'Description comment in post very interesting'
    })).rejects.toBeInstanceOf(AppError)
  })
})

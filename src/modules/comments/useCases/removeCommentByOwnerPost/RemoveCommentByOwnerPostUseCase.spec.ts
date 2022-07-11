import { AppError } from "../../../../shared/errors/AppError";

import { UsersRepositoryInMemory } from "../../../users/repositories/InMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";

import { PostsRepositoryInMemory } from "../../../posts/repositories/InMemory/PostsRepositoryInMemory";
import { CreatePostUseCase } from "../../../posts/useCases/createPost/CreatePostUseCase";

import { CommentsRepositoryInMemory } from "../../repositories/InMemory/CommentsRepositoryInMemory";
import { CreateCommentUseCase } from "../createComment/CreateCommentUseCase";
import { RemoveCommentByOwnerPostUseCase } from "./RemoveCommentByOwnerPostUseCase";
import { SendMailProviderInMemory } from "../../../../shared/container/providers/Mail/inMemory/SendMailProviderInMemory";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let postsRepositoryInMemory: PostsRepositoryInMemory;
let createPostUseCase: CreatePostUseCase
let commentsRepositoryInMemory: CommentsRepositoryInMemory;
let createCommentUseCase: CreateCommentUseCase
let removeCommentByOwnerPostUseCase: RemoveCommentByOwnerPostUseCase
let sendMailProviderInMemory: SendMailProviderInMemory

describe('Remove Comment In Post By Owner Post', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    postsRepositoryInMemory = new PostsRepositoryInMemory()
    commentsRepositoryInMemory = new CommentsRepositoryInMemory()
    sendMailProviderInMemory = new SendMailProviderInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
    createCommentUseCase = new CreateCommentUseCase(commentsRepositoryInMemory, usersRepositoryInMemory, postsRepositoryInMemory, sendMailProviderInMemory);
    removeCommentByOwnerPostUseCase = new RemoveCommentByOwnerPostUseCase(commentsRepositoryInMemory, usersRepositoryInMemory, postsRepositoryInMemory)
  });

  it('Should be able to remove a comment in post by owner post', async () => {
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

    const commentUpdated = await removeCommentByOwnerPostUseCase.execute({
      comment_id: comment.id,
      user_id: user.id,
    })

    expect(commentUpdated.removeOwnerPost).toBe(true)
  })

  it('Should not be able to remove a comment in post without login', async () => {
    await expect(removeCommentByOwnerPostUseCase.execute({
      comment_id: 'wrong-comment-id',
      user_id: 'logout-user',
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

    await expect(removeCommentByOwnerPostUseCase.execute({
      comment_id: 'wrong-comment-id',
      user_id: user.id,
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update a comment in post without be owner post', async () => {
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

    await expect(removeCommentByOwnerPostUseCase.execute({
      comment_id: comment.id,
      user_id: user2.id,
    })).rejects.toBeInstanceOf(AppError)
  })
})

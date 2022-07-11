import { AppError } from "../../../../shared/errors/AppError";

import { UsersRepositoryInMemory } from "../../../users/repositories/InMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";

import { PostsRepositoryInMemory } from "../../../posts/repositories/InMemory/PostsRepositoryInMemory";
import { CreatePostUseCase } from "../../../posts/useCases/createPost/CreatePostUseCase";

import { CommentsRepositoryInMemory } from "../../repositories/InMemory/CommentsRepositoryInMemory";
import { CreateCommentUseCase } from "./CreateCommentUseCase";
import { SendMailProviderInMemory } from "../../../../shared/container/providers/Mail/inMemory/SendMailProviderInMemory";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let postsRepositoryInMemory: PostsRepositoryInMemory;
let createPostUseCase: CreatePostUseCase
let commentsRepositoryInMemory: CommentsRepositoryInMemory;
let createCommentUseCase: CreateCommentUseCase
let sendMailProviderInMemory: SendMailProviderInMemory

describe('Create Comment In Post', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    postsRepositoryInMemory = new PostsRepositoryInMemory()
    commentsRepositoryInMemory= new CommentsRepositoryInMemory()
    sendMailProviderInMemory= new SendMailProviderInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
    createCommentUseCase = new CreateCommentUseCase(commentsRepositoryInMemory, usersRepositoryInMemory, postsRepositoryInMemory, sendMailProviderInMemory);
  });

  it('Should be able to create a new comment in post', async () => {
    const sendMail = jest.spyOn(sendMailProviderInMemory, 'sendMail');

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

    expect(comment).toHaveProperty('id')
    expect(sendMail).toHaveBeenCalled();
  })

  it('Should not be able to create a new comment in post without login', async () => {
    await expect(createCommentUseCase.execute({
      post_id: 'wrong-post',
      user_id: 'logout-user',
      description: 'Description comment in post very interesting'
    })).rejects.toBeInstanceOf(AppError)
  })
})

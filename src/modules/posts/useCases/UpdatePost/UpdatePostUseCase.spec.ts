import { AppError } from "../../../../shared/errors/AppError";
import { compare } from 'bcrypt'

import { UsersRepositoryInMemory } from "../../../users/repositories/InMemory/UsersRepositoryInMemory";
import { PostsRepositoryInMemory } from "../../repositories/InMemory/PostsRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreatePostUseCase } from "../createPost/CreatePostUseCase";
import { UpdatePostUseCase } from "./UpdatePostUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let postsRepositoryInMemory: PostsRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let createPostUseCase: CreatePostUseCase;
let updatePostUseCase: UpdatePostUseCase;

describe('Update Post', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    postsRepositoryInMemory = new PostsRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
    updatePostUseCase = new UpdatePostUseCase(usersRepositoryInMemory, postsRepositoryInMemory)
  });

  it('Should be able to update a post', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    const post = await createPostUseCase.execute({
      user_id: user.id,
      title: 'New Post Very Interesting',
      description: 'Description new post'
    })

    const postUpdated = await updatePostUseCase.execute({
      user_id: user.id,
      post_id: post.id,
      title: 'New Post Very Interesting Updated',
      description: 'Description new post updated'
    })

    expect(postUpdated.title).toBe('New Post Very Interesting Updated');
    expect(postUpdated.description).toBe('Description new post updated');
  })

  it('Should not be able to update an post with inexistent user id', async () => {
    await expect(updatePostUseCase.execute({
      user_id: 'wrong_id',
      post_id: 'wrong-post-id',
      title: 'New Post Very Interesting Updated',
      description: 'Description new post updated'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update a post with invalid post_id', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    await expect(updatePostUseCase.execute({
      user_id: user.id,
      post_id: 'wrong-post-id',
      title: 'New Post Very Interesting Updated',
      description: 'Description new post updated'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update a post if not owner post', async () => {
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
      title: 'New Post Very Interesting',
      description: 'Description new post'
    })

    await expect(updatePostUseCase.execute({
      user_id: user2.id,
      post_id: post.id,
      title: 'New Post Very Interesting Updated',
      description: 'Description new post updated'
    })).rejects.toBeInstanceOf(AppError)
  })
})

import { AppError } from "../../../../shared/errors/AppError";

import { UsersRepositoryInMemory } from "../../../users/repositories/InMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";

import { PostsRepositoryInMemory } from "../../repositories/InMemory/PostsRepositoryInMemory";
import { CreatePostUseCase } from "./CreatePostUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let postsRepositoryInMemory: PostsRepositoryInMemory;
let createPostUseCase: CreatePostUseCase

describe('Create Post', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    postsRepositoryInMemory = new PostsRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
  });

  it('Should be able to create a new post', async () => {
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

    expect(post).toHaveProperty('id')
  })
})

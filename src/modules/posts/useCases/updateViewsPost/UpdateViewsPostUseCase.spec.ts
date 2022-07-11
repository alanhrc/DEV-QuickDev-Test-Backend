import { AppError } from "../../../../shared/errors/AppError";

import { UsersRepositoryInMemory } from "../../../users/repositories/InMemory/UsersRepositoryInMemory";
import { PostsRepositoryInMemory } from "../../repositories/InMemory/PostsRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreatePostUseCase } from "../createPost/CreatePostUseCase";
import { UpdateViewsPostUseCase } from "./UpdateViewsPostUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let postsRepositoryInMemory: PostsRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let createPostUseCase: CreatePostUseCase;
let updateViewsPostUseCase: UpdateViewsPostUseCase;

describe('Views Post', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    postsRepositoryInMemory = new PostsRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
    updateViewsPostUseCase = new UpdateViewsPostUseCase(usersRepositoryInMemory, postsRepositoryInMemory)
  });

  it('Should be able to add view to post', async () => {
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

    const postUpdated = await updateViewsPostUseCase.execute({
      user_id: user.id,
      post_id: post.id
    })

    expect(postUpdated.views).toBe(1);
  })

  it('Should not be able to add view to post with inexistent id', async () => {
    await expect(updateViewsPostUseCase.execute({
      user_id: 'wrong_id',
      post_id: 'wrong-post-id',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to add view to post with invalid post_id', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    await expect(updateViewsPostUseCase.execute({
      user_id: user.id,
      post_id: 'wrong-post-id',
    })).rejects.toBeInstanceOf(AppError)
  })
})

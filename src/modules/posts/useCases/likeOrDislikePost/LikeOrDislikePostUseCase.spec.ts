import { AppError } from "../../../../shared/errors/AppError";

import { UsersRepositoryInMemory } from "../../../users/repositories/InMemory/UsersRepositoryInMemory";
import { PostsRepositoryInMemory } from "../../repositories/InMemory/PostsRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreatePostUseCase } from "../createPost/CreatePostUseCase";
import { LikeOrDislikePostUseCase } from "./LikeOrDislikePostUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let postsRepositoryInMemory: PostsRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let createPostUseCase: CreatePostUseCase;
let likeOrDislikePostUseCase: LikeOrDislikePostUseCase;

describe('Like Or Dislike Post', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    postsRepositoryInMemory = new PostsRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
    likeOrDislikePostUseCase = new LikeOrDislikePostUseCase(usersRepositoryInMemory, postsRepositoryInMemory)
  });

  it('Should be able to like a post', async () => {
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

    const postUpdated = await likeOrDislikePostUseCase.execute({
      user_id: user.id,
      post_id: post.id,
      like: 'like'
    })

    expect(postUpdated.likes).toBe(1);
  })

  it('Should be able to dislike a post', async () => {
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

    const postUpdated = await likeOrDislikePostUseCase.execute({
      user_id: user.id,
      post_id: post.id,
      like: 'dislike'
    })

    expect(postUpdated.dislikes).toBe(1);
  })

  it('Should not be able to like or dislike a post with inexistent id', async () => {
    await expect(likeOrDislikePostUseCase.execute({
      user_id: 'wrong_id',
      post_id: 'wrong-post-id',
      like: 'like'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update a post with invalid post_id', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    await expect(likeOrDislikePostUseCase.execute({
      user_id: user.id,
      post_id: 'wrong-post-id',
      like: 'dislike'
    })).rejects.toBeInstanceOf(AppError)
  })
})

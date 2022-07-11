import { AppError } from "../../../../shared/errors/AppError";

import { UsersRepositoryInMemory } from "../../../users/repositories/InMemory/UsersRepositoryInMemory";
import { PostsRepositoryInMemory } from "../../repositories/InMemory/PostsRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreatePostUseCase } from "../createPost/CreatePostUseCase";
import { GetAllPostsUseCase } from "./GetAllPostsUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let postsRepositoryInMemory: PostsRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let createPostUseCase: CreatePostUseCase;
let getAllPostsUseCase: GetAllPostsUseCase;

describe('Get ALl Posts', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    postsRepositoryInMemory = new PostsRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
    getAllPostsUseCase = new GetAllPostsUseCase(usersRepositoryInMemory, postsRepositoryInMemory)
  });

  it('Should be able to get all posts', async () => {
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

    const post2 = await createPostUseCase.execute({
      user_id: user.id,
      title: 'New Post Very Interesting 2',
      description: 'Description new post 2'
    })

    const posts = await getAllPostsUseCase.execute(user.id)

    expect(posts).toEqual([post, post2]);
  })

  it('Should not be able to get all posts with inexistent user id', async () => {
    await expect(getAllPostsUseCase.execute('wrong-id')).rejects.toBeInstanceOf(AppError)
  })
})

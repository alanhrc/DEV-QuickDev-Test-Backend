import { AppError } from "../../../../shared/errors/AppError";

import { UsersRepositoryInMemory } from "../../../users/repositories/InMemory/UsersRepositoryInMemory";
import { PostsRepositoryInMemory } from "../../repositories/InMemory/PostsRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreatePostUseCase } from "../createPost/CreatePostUseCase";
import { UploadFilesPostUseCase } from "./UploadFilesPostUseCase";
import { UploadedFilesRepositoryInMemory } from "../../../uploadFiles/repositories/InMemory/UploadedFilesRepositoryInMemory";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let postsRepositoryInMemory: PostsRepositoryInMemory;
let uploadedFilesRepositoryInMemory: UploadedFilesRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let createPostUseCase: CreatePostUseCase;
let uploadFilesPostUseCase: UploadFilesPostUseCase;

describe('Upload File In Post', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    postsRepositoryInMemory = new PostsRepositoryInMemory()
    uploadedFilesRepositoryInMemory = new UploadedFilesRepositoryInMemory()

    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createPostUseCase = new CreatePostUseCase(postsRepositoryInMemory);
    uploadFilesPostUseCase = new UploadFilesPostUseCase(usersRepositoryInMemory, postsRepositoryInMemory, uploadedFilesRepositoryInMemory)
  });

  const files = [
    {
      "fieldname": "files",
      "originalname": "sandbox.jpeg",
      "encoding": "7bit",
      "mimetype": "image/jpeg",
      "destination": "/Users/mac/Development/QuickDev/tmp/uploadedFiles",
      "filename": "47b836f19c9e8c377d07_sandbox.jpeg",
      "path": "/Users/mac/Development/QuickDev/tmp/uploadedFiles/47b836f19c9e8c377d07_sandbox.jpeg",
      "size": 51298
    },
    {
      "fieldname": "files",
      "originalname": "sandbox.jpeg",
      "encoding": "7bit",
      "mimetype": "image/jpeg",
      "destination": "/Users/mac/Development/QuickDev/tmp/uploadedFiles",
      "filename": "8e32d76550ab92a17789_sandbox.jpeg",
      "path": "/Users/mac/Development/QuickDev/tmp/uploadedFiles/8e32d76550ab92a17789_sandbox.jpeg",
      "size": 51298
    }
  ] as Express.Multer.File[]

  it('Should be able to upload a file in post', async () => {
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

    const uploadedFile = await uploadFilesPostUseCase.execute({
      user_id: user.id,
      post_id: post.id,
      files
    })

    expect(uploadedFile[0]).toHaveProperty('id');
  })

  it('Should not be able to upload file in post with inexistent user id', async () => {
    await expect(uploadFilesPostUseCase.execute({
      user_id: 'wrong_id',
      post_id: 'wrong-post-id',
      files
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to upload file in post with invalid post_id', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    await expect(uploadFilesPostUseCase.execute({
      user_id: user.id,
      post_id: 'wrong-post-id',
      files
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update file in post if not owner post', async () => {
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

    await expect(uploadFilesPostUseCase.execute({
      user_id: user2.id,
      post_id: post.id,
      files
    })).rejects.toBeInstanceOf(AppError)
  })
})

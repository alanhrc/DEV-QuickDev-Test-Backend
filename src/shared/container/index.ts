import { container } from 'tsyringe';

import './providers'

import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/users/repositories/UsersRepository';

import { IPostsRepository } from '../../modules/posts/repositories/IPostsRepository';
import { PostsRepository } from '../../modules/posts/repositories/PostsRepository';

import { ICommentsRepository } from '../../modules/comments/repositories/ICommentsRepository';
import { CommentsRepository } from '../../modules/comments/repositories/CommentsRepository';

import { IUploadedFilesRepository } from '../../modules/uploadFiles/repositories/IUploadedFilesRepository';
import { UploadedFilesRepository } from '../../modules/uploadFiles/repositories/UploadedFilesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository
);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository
);

container.registerSingleton<IUploadedFilesRepository>(
  'UploadedFilesRepository',
  UploadedFilesRepository
);

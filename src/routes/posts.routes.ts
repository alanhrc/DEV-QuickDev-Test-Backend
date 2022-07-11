import { Router } from 'express';
import multer from 'multer'
import uploadConfig from '../config/upload'

import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAuthenticate';

import { CreatePostController } from '../modules/posts/useCases/createPost/CreatePostController';
import { UpdatePostController } from '../modules/posts/useCases/UpdatePost/UpdatePostController';
import { LikeOrDislikePostController } from '../modules/posts/useCases/likeOrDislikePost/LikeOrDislikePostController';
import { UpdateViewsPostController } from '../modules/posts/useCases/updateViewsPost/UpdateViewsPostController';
import { GetAllPostsController } from '../modules/posts/useCases/getAllPosts/GetAllPostsController';
import { UploadFilesPostController } from '../modules/posts/useCases/uploadFile/UploadFilesPostController';

const postsRouter = Router();
const uploadFile = multer(uploadConfig.upload())
const createPostController = new CreatePostController();
const updatePostController = new UpdatePostController();
const likeOrDislikePostController = new LikeOrDislikePostController();
const updateViewsPostController = new UpdateViewsPostController();
const getAllPostsController = new GetAllPostsController();
const uploadFilesPostController = new UploadFilesPostController();

postsRouter.use(ensureAuthenticated)
postsRouter.post('/', createPostController.execute);
postsRouter.put('/:post_id', updatePostController.execute);
postsRouter.patch('/:post_id', likeOrDislikePostController.execute);
postsRouter.patch('/views/:post_id', updateViewsPostController.execute);
postsRouter.get('/', getAllPostsController.execute);
postsRouter.patch('/upload/:post_id', uploadFile.array("files"), uploadFilesPostController.execute);

export { postsRouter };

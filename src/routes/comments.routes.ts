import { Router } from 'express';

import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAuthenticate';

import { CreateCommentController } from '../modules/comments/useCases/createComment/CreateCommentController';
import { UpdateCommentController } from '../modules/comments/useCases/updateComment/UpdateCommentController';
import { RemoveCommentByOwnerController } from '../modules/comments/useCases/removeCommentByOwnerPost/RemoveCommentByOwnerPostController';

const commentsRouter = Router();
const createCommentController = new CreateCommentController();
const updateCommentController = new UpdateCommentController();
const removeCommentByOwnerController = new RemoveCommentByOwnerController();

commentsRouter.post('/:post_id', ensureAuthenticated, createCommentController.execute);
commentsRouter.put('/:comment_id', ensureAuthenticated, updateCommentController.execute);
commentsRouter.patch('/:comment_id', ensureAuthenticated, removeCommentByOwnerController.execute);

export { commentsRouter };

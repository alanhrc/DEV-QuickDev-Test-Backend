import { Router } from 'express';

import { usersRouter } from './users.routes';
import { authRouter } from './sessions.routes';
import { postsRouter } from './posts.routes';
import { commentsRouter } from './comments.routes';

const router = Router();

router.use('/sessions', authRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);

export { router };

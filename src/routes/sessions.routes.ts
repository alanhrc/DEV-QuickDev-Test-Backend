import { Router } from 'express';

import { AuthenticateUserController } from '../modules/users/useCases/authenticateUser/AuthenticateUserController';

const authRouter = Router();
const authenticateUserController = new AuthenticateUserController();

authRouter.post('/', authenticateUserController.execute);

export { authRouter };

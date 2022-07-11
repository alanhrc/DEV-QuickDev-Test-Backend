import "reflect-metadata"
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';

import './shared/container';
import { router } from './routes';
import { AppError } from './shared/errors/AppError';

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { app };

import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { AppError } from "../../../errors/AppError";

import authConfig from '../../../../config/auth';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing!', 401)
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret) as IPayload;

    request.user = {
      user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid Token!', 401)
  }
}

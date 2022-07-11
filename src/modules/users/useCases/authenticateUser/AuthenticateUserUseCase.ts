import  'reflect-metadata'
import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AppError } from "../../../../shared/errors/AppError";

import authConfig from '../../../../config/auth';

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IAuthenticateUserDTO } from "../../dtos/IAuthenticateUserDTO";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IAuthenticateUserDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError('E-mail or password incorrect!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('E-mail or password incorrect!');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const user_id = user.id

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    const token = sign({ user_id }, `${secret}`, {
      subject: user.id,
      expiresIn,
    });

    return { user: userWithoutPassword, token }
  }
}

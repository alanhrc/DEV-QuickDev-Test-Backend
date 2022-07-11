import  'reflect-metadata'
import { Users as User } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { hash, compare } from 'bcrypt';
import { AppError } from "../../../../shared/errors/AppError";

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, name, email, old_password, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found!', 401);
    }

    const userWithEmailExists = await this.usersRepository.findByEmail(email);

    if (userWithEmailExists && userWithEmailExists.id !== user_id) {
      throw new AppError('E-mail already in use!', 401);
    }

    user.name = name;
    user.email = email;

    if (password && old_password) {
      const checkUserOldPassword = await compare(
        old_password,
        user.password,
      );

      if (!checkUserOldPassword) {
        throw new AppError(
          'You need to inform the old password correct to set a new password!', 401
        );
      }

      user.password = await hash(password, 10)
    }

    const userUpdated = await this.usersRepository.update(user)

    return userUpdated
  }
}

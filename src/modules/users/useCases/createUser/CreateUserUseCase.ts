import  'reflect-metadata'
import { Users as User } from '@prisma/client';
import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt';
import { AppError } from "../../../../shared/errors/AppError";

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('E-mail already exists', 401);
    }
    const hashPassword = await hash(password, 10)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword
    })

    return user
  }
}

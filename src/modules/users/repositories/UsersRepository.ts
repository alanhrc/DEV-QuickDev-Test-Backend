import { Users as User } from '@prisma/client'
import { prisma } from "../../../../prisma/database/prismaClient";

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.users.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async findById(user_id: string): Promise<User | null> {
    const user = await prisma.users.findUnique({
      where: {
        id: user_id
      }
    })

    return user
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password
      }
    })

    return user;
  }

  async update(user: User): Promise<User> {
    const userUpdated = await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: new Date()
      }
    })

    return userUpdated
  }
}

import { AppError } from "../../../../shared/errors/AppError";
import { compare } from 'bcrypt'

import { UsersRepositoryInMemory } from "../../repositories/InMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let updateUserUseCase: UpdateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Update User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to update an user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    const userUpdated = await updateUserUseCase.execute({
      user_id: user.id,
      name: 'Alan Henrique Updated',
      email: 'alancamargo51@gmail.com',
      old_password: '123456',
      password: '654321'
    })

    const passwordHash = await compare('654321', userUpdated.password)

    expect(userUpdated.name).toBe('Alan Henrique Updated');
    expect(userUpdated.email).toBe('alancamargo51@gmail.com');
    expect(passwordHash).toBe(true);
  })

  it('Should not be able to update an user with existent id', async () => {
    await expect(updateUserUseCase.execute({
      user_id: 'wrong_id',
      name: 'Alan Henrique Updated',
      email: 'alancamargo50@gmail.com'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update an user with existent e-mail', async () => {
    await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    const user = await createUserUseCase.execute({
      name: 'Alan Henrique 2',
      email: 'alancamargo51@gmail.com',
      password: '123456',
    });

    await expect(updateUserUseCase.execute({
      user_id: user.id,
      name: 'Alan Henrique Updated',
      email: 'alancamargo50@gmail.com'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to update an user with wrong old password', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    await expect(updateUserUseCase.execute({
      user_id: user.id,
      name: 'Alan Henrique Updated',
      email: 'alancamargo50@gmail.com',
      old_password: 'wrong-password',
      password: 'some-password'
    })).rejects.toBeInstanceOf(AppError)
  })
})

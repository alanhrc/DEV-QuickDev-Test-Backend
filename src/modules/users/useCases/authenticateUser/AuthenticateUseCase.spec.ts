import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/InMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    const userAuthenticated = await authenticateUserUseCase.execute({
      email: user.email!,
      password: '123456'
    })

    expect(userAuthenticated).toHaveProperty('token');
  })

  it('Should not be able to authenticate an user with wrong e-mail', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'wrong-email',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  })

  it('Should not be able to authenticate an user with wrong password', async () => {
    const user = await createUserUseCase.execute({
      name: 'Alan Henrique',
      email: 'alancamargo50@gmail.com',
      password: '123456',
    });

    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: 'wrong-password',
    })).rejects.toBeInstanceOf(AppError);
  })
})

import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UsersRepository from '../infra/prisma/repositories/UsersRepository';

interface IRequest {
  username: string;
}

@injectable()
export default class ShowByUsernameUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({ username }: IRequest): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new AppError('User not found', 404);

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}

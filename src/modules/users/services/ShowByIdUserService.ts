import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UsersRepository from '../infra/prisma/repositories/UsersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class ShowByIdUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('User not found', 404);

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}

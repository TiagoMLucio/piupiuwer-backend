import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UsersRepository from '../infra/prisma/repositories/UsersRepository';

interface IRequest {
  page: number;
  take: number;
}

@injectable()
export default class ShowUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({ page, take } : IRequest): Promise<Omit<User, 'password'>[]> {
    const users = Number.isNaN(page) || Number.isNaN(take) ? await this.usersRepository.find() : await (async () => {
      if (take <= 0) throw new AppError('Take should be a nonzero positive integer');
      if (page <= -1) throw new AppError('Page should be a positive integer');
      const skip = page * take;

      return this.usersRepository.findWithPagination({ skip, take });
    })();

    const usersWithoutPassword = users.map((user) => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return usersWithoutPassword;
  }
}

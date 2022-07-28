import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import UsersRepository from '../infra/prisma/repositories/UsersRepository';

@injectable()
export default class ShowUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();

    const usersWithoutPassword = users.map((user) => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return usersWithoutPassword;
  }
}

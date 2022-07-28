import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import UsersRepository from '../infra/prisma/repositories/UsersRepository';

@injectable()
export default class ShowUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.find();

    return users;
  }
}

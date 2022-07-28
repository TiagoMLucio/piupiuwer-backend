import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import UsersRepository from '../infra/prisma/repositories/UsersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class ShowOneUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User | null> {
    const user = await this.usersRepository.findById(id);

    return user;
  }
}

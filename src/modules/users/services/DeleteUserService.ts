import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositores/IUsersRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    id: string,
  ) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.usersRepository.delete(id);
  }
}

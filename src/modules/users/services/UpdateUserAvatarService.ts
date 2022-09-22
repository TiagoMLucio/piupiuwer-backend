import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';
import UsersRepository from '../infra/prisma/repositories/UsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName, ...rest }: IRequest): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'User not found',
        404,
      );
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFileName;

    await this.usersRepository.update({ ...user, ...rest });

    const { password: _, ...userWithoutPassword } = { ...user, ...rest };

    return userWithoutPassword;
  }
}

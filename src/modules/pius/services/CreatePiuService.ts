import IUsersRepository from '@modules/users/repositores/IUsersRepository';
import { Piu } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  user_id: string;
  text: string;
}

@injectable()
export default class CreatePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    text,
  }: IRequest): Promise<Piu> {
    const piuChars = text.length;

    if (piuChars === 0) throw new AppError('Pius must have more at least one character');
    if (piuChars > 140) {
      throw new AppError(
        "Pius can't have more than 140 characters",
      );
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const piu = await this.piusRepository.create({
      user_id,
      text,
    });

    return piu;
  }
}

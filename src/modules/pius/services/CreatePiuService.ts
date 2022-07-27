import IUsersRepository from '@modules/users/repositores/IUsersRepository';
import { Piu } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  user_id: string;
  text: string;
  loggedUser: { id: string };
}

@injectable()
export default class CreatePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    user_id,
    text,
    loggedUser: { id: loggedId },
  }: IRequest): Promise<Piu> {
    const piuChars = text.length;

    if (piuChars === 0) throw new AppError('Não é possível enviar pius vazios');
    if (piuChars > 140) {
      throw new AppError(
        'Não é possível enviar pius com mais de 140 caracteres'
      );
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Nenhum usuário com esse id foi encontrado');
    }

    if (user.id !== loggedId)
      throw new AppError(
        'Não é possível postar pius com ids de outros usuários'
      );

    const piu = await this.piusRepository.create({
      user_id,
      text,
    });

    return piu;
  }
}

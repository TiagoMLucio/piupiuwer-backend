import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UsersRepository from '../infra/prisma/repositories/UsersRepository';

interface IRequest {
  id: string;
  username: string;
  name: string;
  email: string;
  cpf: string;
  birth_date: string;
  phone: string;
  about?: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({
    id, cpf, email, birth_date, phone, about, name, username,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError(
        'User not found',
        404,
      );
    }

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail && userWithSameEmail.id !== user.id) throw new AppError('Email already exits');

    const userWithSameCpf = await this.usersRepository.findByCpf(cpf);

    if (userWithSameCpf && userWithSameCpf.id !== user.id) throw new AppError('Cpf already exits');

    const updatedUser = await this.usersRepository.update({
      ...user, cpf, email, birth_date, phone, about: about ?? user.about, name, username,
    });

    return updatedUser;
  }
}

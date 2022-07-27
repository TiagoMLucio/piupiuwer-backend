import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositores/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birth_date: string;
  phone: string;
  about?: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email, cpf, password, ...rest
  }: IRequest) {
    const checkIfUserWithSameEmailExists = await this.usersRepository.findByEmail(email);

    if (checkIfUserWithSameEmailExists) {
      throw new AppError('Email already used');
    }

    const checkIfUserWithSameCpfExists = await this.usersRepository.findByCpf(
      cpf,
    );

    if (checkIfUserWithSameCpfExists) throw new AppError('Cpf already used');

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      cpf,
      ...rest,
    });

    user.password = '###';

    return user;
  }
}

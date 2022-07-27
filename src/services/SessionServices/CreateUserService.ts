import { PrismaClient, User } from '@prisma/client';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birth_date: string;
  phone: string;
  about?: string;
  photo?: string;
}

class CreateUserService {
  public async execute({
    email,
    cpf,
    password,
    ...rest
  }: IRequest): Promise<User> {
    const prisma = new PrismaClient();

    const existEmail = await prisma.user.findFirst({ where: { email } });

    if (existEmail) throw new AppError('Esse email já está em uso');

    const existCpf = await prisma.user.findFirst({ where: { cpf } });

    if (existCpf) throw new AppError('Esse CPF já está em uso');

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        cpf,
        ...rest,
      },
    });

    user.password = '###';

    return user;
  }
}

export default CreateUserService;

import { PrismaClient, User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '../../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IReturn {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IReturn> {
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/pasword combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/pasword combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    user.password = '###';

    return { user, token };
  }
}

export default AuthenticateUserService;

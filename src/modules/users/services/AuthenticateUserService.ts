import auth from '@config/auth';
import { User } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositores/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  userWithoutPassword: Omit<User, 'password'>;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email/password combination');

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new AppError('Incorrect email/password combination');

    const { expiresIn, secret } = auth.jwt;

    const token = sign({}, secret as Secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: _, ...userWithoutPassword } = user;

    return {
      userWithoutPassword,
      token,
    };
  }
}

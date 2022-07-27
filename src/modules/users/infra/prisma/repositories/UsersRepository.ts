import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositores/IUsersRepository';
import { User } from '@prisma/client';
import client from '@shared/infra/prisma/client';

export default class UsersRepository implements IUsersRepository {
  private prismaClient;

  constructor() {
    this.prismaClient = client.user;
  }

  create(data: ICreateUserDTO): Promise<User> {
    const user = this.prismaClient.create({
      data,
    });

    return user;
  }

  findById(id: string): Promise<User | null> {
    const user = this.prismaClient.findUnique({ where: { id } });

    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.prismaClient.findUnique({ where: { email } });

    return user;
  }

  findByCpf(cpf: string): Promise<User | null> {
    const user = this.prismaClient.findUnique({ where: { cpf } });

    return user;
  }
}

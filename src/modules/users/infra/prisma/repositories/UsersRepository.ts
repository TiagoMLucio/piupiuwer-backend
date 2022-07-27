import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositores/IUsersRepository';
import { User } from '@prisma/client';
import client from '@shared/infra/prisma/client';

export default class UsersRepository implements IUsersRepository {
  private prismaClient;

  constructor() {
    this.prismaClient = client.user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = await this.prismaClient.create({
      data,
    });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prismaClient.findUnique({ where: { id } });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaClient.findUnique({ where: { email } });

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prismaClient.findUnique({ where: { cpf } });

    return user;
  }
}

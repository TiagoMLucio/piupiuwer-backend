import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IShowUsersPaginationDTO from '@modules/users/dtos/IShowUserPaginationDTO';
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

  public async find(): Promise<User[]> {
    const users = await this.prismaClient.findMany();

    return users;
  }

  public async findWithPagination({ skip, take }: IShowUsersPaginationDTO): Promise<User[]> {
    const users = await this.prismaClient.findMany({ skip, take });

    return users;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prismaClient.findUnique({ where: { id } });

    return user;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const user = await this.prismaClient.findUnique({ where: { username } });

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

  public async update(user: User): Promise<User> {
    const updatedUser = await this.prismaClient.update({
      data: user,
      where: { id: user.id },
    });

    return updatedUser;
  }

  public async delete(id: string): Promise<void> {
    await this.prismaClient.delete({ where: { id } });
  }
}

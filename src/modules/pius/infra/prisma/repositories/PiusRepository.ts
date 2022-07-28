import ICreatePiuDTO from '@modules/pius/dtos/ICreatePiuDTO';
import IShowPaginationDTO from '@modules/pius/dtos/IShowPiusPaginationDTO';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import { Piu } from '@prisma/client';
import client from '@shared/infra/prisma/client';

export default class PiusRepository implements IPiusRepository {
  private prismaClient;

  constructor() {
    this.prismaClient = client.piu;
  }

  public async create({ user_id, text }: ICreatePiuDTO): Promise<Piu> {
    const piu = await this.prismaClient.create({ data: { user_id, text } });

    return piu;
  }

  public async find(): Promise<Piu[]> {
    const pius = await this.prismaClient.findMany();

    return pius;
  }

  public async findWithPagination({ skip, take }: IShowPaginationDTO): Promise<Piu[]> {
    const pius = await this.prismaClient.findMany({ skip, take });

    return pius;
  }
}

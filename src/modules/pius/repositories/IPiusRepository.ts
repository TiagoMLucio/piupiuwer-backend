import { Piu } from '@prisma/client';
import ICreatePiuDTO from '../dtos/ICreatePiuDTO';
import IShowPaginationDTO from '../dtos/IShowPiusPaginationDTO';

interface IPiusRepository {
  create(data: ICreatePiuDTO): Promise<Piu>;
  find(): Promise<Piu[]>;
  findWithPagination({ skip, take } : IShowPaginationDTO): Promise<Piu[]>;
}

export default IPiusRepository;

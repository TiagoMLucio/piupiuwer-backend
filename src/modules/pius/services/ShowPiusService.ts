import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  page: number;
  take: number;
}

@injectable()
export default class ShowPiusService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,
  ) {}

  public async execute({ page, take } : IRequest) {
    const pius = Number.isNaN(page) || Number.isNaN(take) ? await this.piusRepository.find() : await (async () => {
      if (take <= 0) throw new AppError('Take should be a nonzero positive integer');
      if (page <= -1) throw new AppError('Take should be a positive integer');
      const skip = page * take;

      return this.piusRepository.findWithPagination({ skip, take });
    })();

    return pius;
  }
}

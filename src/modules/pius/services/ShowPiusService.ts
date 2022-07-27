import { inject, injectable } from 'tsyringe';
import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
export default class ShowPiusService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository
  ) {}

  public async execute() {
    const pius = await this.piusRepository.find();

    return pius;
  }
}

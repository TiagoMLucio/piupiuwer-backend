import AppError from '@shared/errors/AppError';
import PiuRepository from '../../repositories/PiusRepository';

interface IRequest {
  id: string;
}

class DeletePiuService {
  private piusRepository: PiuRepository;

  constructor(piusRepository: PiuRepository) {
    this.piusRepository = piusRepository;
  }

  public execute({ id }: IRequest) {
    const piuIndex = this.piusRepository.findIndexById(id);
    if (piuIndex < 0) {
      throw new AppError('Nenhum piu com esse id foi encontrado');
    }
    this.piusRepository.delete({ index: piuIndex });
  }
}

export default DeletePiuService;

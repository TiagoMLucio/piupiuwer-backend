import AppError from '@shared/errors/AppError';
import Piu from '../../models/Pius';
import PiuRepository from '../../repositories/PiusRepository';

interface IRequest {
  id: string;
  data: {
    text: string;
  };
}

class UpdatePiuService {
  private piusRepository: PiuRepository;

  constructor(piusRepository: PiuRepository) {
    this.piusRepository = piusRepository;
  }

  public execute({ id, data }: IRequest): Piu {
    const piuIndex = this.piusRepository.findIndexById(id);
    if (piuIndex < 0) {
      throw new AppError('Nenhum piu com esse id foi encontrado');
    }

    const piu = this.piusRepository.update({
      index: piuIndex,
      data,
    });
    return piu;
  }
}

export default UpdatePiuService;

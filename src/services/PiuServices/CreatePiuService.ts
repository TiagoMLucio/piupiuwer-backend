import AppError from '@shared/errors/AppError';
import Piu from '../../models/Pius';
import PiuRepository from '../../repositories/PiusRepository';
import UserRepository from '../../repositories/UsersRepository';

interface ICreatePiuServiceRepositories {
  piusRepository: PiuRepository;
  usersRepository: UserRepository;
}

interface IRequest {
  user_id: string;
  text: string;
}

class CreatePiuService {
  private piusRepository: PiuRepository;

  private usersRepository: UserRepository;

  constructor({
    piusRepository,
    usersRepository,
  }: ICreatePiuServiceRepositories) {
    this.piusRepository = piusRepository;
    this.usersRepository = usersRepository;
  }

  public execute(data: IRequest): Piu {
    const piuChars = data.text.length;
    if (piuChars === 0) throw new AppError('Não é possível enviar pius vazios');
    if (piuChars > 140) {
      throw new AppError(
        'Não é possível enviar pius com mais de 140 caracteres',
      );
    }
    const userIndex = this.usersRepository.findIndexById(data.user_id);
    if (userIndex < 0) {
      throw new AppError('Nenhum usuário com esse id foi encontrado');
    }
    const piu = this.piusRepository.create(data);
    return piu;
  }
}

export default CreatePiuService;

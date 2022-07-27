import AppError from '@shared/errors/AppError';
import UserRepository from '../../repositories/UsersRepository';

interface IRequest {
  id: string;
}

class DeleteUserService {
  private usersRepository: UserRepository;

  constructor(usersRepository: UserRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ id }: IRequest) {
    const userIndex = this.usersRepository.findIndexById(id);
    if (userIndex < 0) {
      throw new AppError('Nenhum usuário com esse id foi encontrado');
    }
    this.usersRepository.delete({ index: userIndex });
  }
}

export default DeleteUserService;

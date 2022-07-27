import AppError from '@shared/errors/AppError';
import User from '../../models/Users';
import UserRepository from '../../repositories/UsersRepository';

interface IRequest {
  id: string;
}

class GetUserService {
  private usersRepository: UserRepository;

  constructor(usersRepository: UserRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ id }: IRequest): User {
    const userIndex = this.usersRepository.findIndexById(id);
    if (userIndex < 0) {
      throw new AppError('Nenhum usuário com esse id foi encontrado');
    }
    return this.usersRepository.get({ index: userIndex });
  }
}

export default GetUserService;

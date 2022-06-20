import User from '../models/Users';
import UserRepository from '../repositories/UsersRepository';

interface Request {
    id: string;
}

class DeleteUserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public execute({ id }: Request) {
        const userIndex = this.userRepository.findIndexById(id);
        if (userIndex < 0)
            throw Error('Nenhum usuário com esse id foi encontrado.');
        const user = this.userRepository.delete({
            index: userIndex,
        });
    }
}

export default DeleteUserService;

import User from '../models/Users';
import UserRepository from '../repositories/UsersRepository';

interface Request {
    id: string;
}

class GetUserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public execute({ id }: Request): User {
        const userIndex = this.userRepository.findIndexById(id);
        if (userIndex < 0)
            throw Error('Nenhum usuário com esse id foi encontrado.');
        return this.userRepository.get({ index: userIndex });
    }
}

export default GetUserService;

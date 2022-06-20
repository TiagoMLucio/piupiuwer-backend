import User from '../models/Users';
import UserRepository from '../repositories/UsersRepository';

interface Request {
    name: string;
    birth_date: Date;
    cpf: string;
    phone: string;
    created_at: Date;
    updated_at: Date;
}

class CreateUserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public execute(data: Request): User {
        if (this.userRepository.findIndexByCpf(data.cpf) >= 0)
            throw Error('Um usuário com esse CPF já foi cadastrado.');
        const user = this.userRepository.create(data);
        return user;
    }
}

export default CreateUserService;
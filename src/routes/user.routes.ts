import { parseISO } from 'date-fns';
import { Router } from 'express';

import User from '../models/Users';
import UserRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import UpdateUserService from '../services/UpdateUserService';

const usersRouter = Router();
const usersRepository = new UserRepository();

usersRouter.get('/', (request, response) => {
    const users = usersRepository.all();

    return response.json(users);
});

usersRouter.post('/', (request, response) => {
    try {
        const data = request.body;

        const createUser = new CreateUserService(usersRepository);

        const user = createUser.execute({
            ...data,
            birth_date: parseISO(data.birth_date),
        });

        return response.json(user);
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

usersRouter.put('/:id', (request, response) => {
    try {
        const data = request.body;
        const { id } = request.params;

        const updateUser = new UpdateUserService(usersRepository);

        const user = updateUser.execute({
            id,
            data: {
                ...data,
                birth_date: parseISO(data.birth_date),
            },
        });

        return response.json(user);
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

usersRouter.delete('/:id', (request, response) => {
    try {
        const { id } = request.params;

        const deleteUser = new DeleteUserService(usersRepository);

        const user = deleteUser.execute({ id });

        return response.status(204).send();
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

export default usersRouter;

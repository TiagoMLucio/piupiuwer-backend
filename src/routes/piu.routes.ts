import { parseISO } from 'date-fns';
import { Router } from 'express';
import PiuRepository from '../repositories/PiusRepository';
import UserRepository from '../repositories/UsersRepository';
import CreatePiuService from '../services/PiuServices/CreatePiuService';
import DeletePiuService from '../services/PiuServices/DeletePiuService';
import GetPiuService from '../services/PiuServices/GetPiuService';
import UpdatePiuService from '../services/PiuServices/UpdatePiuService';

const piusRouter = Router();
const piusRepository = new PiuRepository();
const usersRepository = new UserRepository();

piusRouter.get('/', (request, response) => {
    const users = piusRepository.all();

    return response.json(users);
});

piusRouter.get('/:id', (request, response) => {
    try {
        const { id } = request.params;

        const getPiu = new GetPiuService(piusRepository);

        const piu = getPiu.execute({ id });

        return response.json(piu);
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

piusRouter.post('/', (request, response) => {
    try {
        const data = request.body;

        const createUser = new CreatePiuService({
            piusRepository,
            usersRepository,
        });

        const user = createUser.execute({
            ...data,
            birth_date: parseISO(data.birth_date),
        });

        return response.json(user);
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

piusRouter.put('/:id', (request, response) => {
    try {
        const data = request.body;
        const { id } = request.params;

        const updateUser = new UpdatePiuService(piusRepository);

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

piusRouter.delete('/:id', (request, response) => {
    try {
        const { id } = request.params;

        const deletePiu = new DeletePiuService(piusRepository);

        deletePiu.execute({ id });

        return response.status(204).send();
    } catch (e: any) {
        return response.status(400).json({ error: e.message });
    }
});

export default piusRouter;

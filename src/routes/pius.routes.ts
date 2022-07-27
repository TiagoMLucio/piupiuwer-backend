import {
  NextFunction, Request, Response, Router,
} from 'express';
import ensureAuthenticated from '../modules/users/infra/http/middlewares/ensureAuthenticated';
import validateId from '../middlewares/validateId';
import PiuRepository from '../repositories/PiusRepository';
import CreatePiuService from '../services/PiuServices/CreatePiuService';
import DeletePiuService from '../services/PiuServices/DeletePiuService';
import GetPiuService from '../services/PiuServices/GetPiuService';
import UpdatePiuService from '../services/PiuServices/UpdatePiuService';
import { usersRepository } from './users.routes';

const piusRouter = Router();
export const piusRepository = new PiuRepository();

const validateData = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { user_id, text } = request.body;

  if (!user_id || !text) {
    return response.status(400).json({ error: 'Parâmetros inválidos.' });
  }

  return next();
};

piusRouter.use(ensureAuthenticated);

piusRouter.get('/', (request, response) => {
  const users = piusRepository.all();

  return response.json(users);
});

piusRouter.get('/:id', validateId, (request, response) => {
  const { id } = request.params;

  const getPiu = new GetPiuService(piusRepository);

  const piu = getPiu.execute({ id });

  return response.json(piu);
});

piusRouter.post('/', validateData, (request, response) => {
  const data = request.body;

  const createUser = new CreatePiuService({
    piusRepository,
    usersRepository,
  });

  const user = createUser.execute(data);

  return response.json(user);
});

piusRouter.put('/:id', validateId, (request, response) => {
  const data = request.body;
  const { id } = request.params;

  const updateUser = new UpdatePiuService(piusRepository);

  const user = updateUser.execute({
    id,
    data,
  });

  return response.json(user);
});

piusRouter.delete('/:id', validateId, (request, response) => {
  const { id } = request.params;

  const deletePiu = new DeletePiuService(piusRepository);

  deletePiu.execute({ id });

  return response.status(204).send();
});

export default piusRouter;

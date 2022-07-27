import { parseISO } from 'date-fns';
import { Router } from 'express';
import ensureAuthenticated from '../modules/users/infra/http/middlewares/ensureAuthenticated';
import validateId from '../middlewares/validateId';

import UserRepository from '../repositories/UsersRepository';
import DeleteUserService from '../services/UserServices/DeleteUserService';
import GetUserService from '../services/UserServices/GetUserService';
import UpdateUserService from '../services/UserServices/UpdateUserService';

const usersRouter = Router();
export const usersRepository = new UserRepository();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', (request, response) => {
  const users = usersRepository.all();

  return response.json(users);
});

usersRouter.get('/:id', validateId, (request, response) => {
  const { id } = request.params;

  const getUser = new GetUserService(usersRepository);

  const user = getUser.execute({ id });

  return response.json(user);
});

usersRouter.put('/:id', validateId, (request, response) => {
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
});

usersRouter.delete('/:id', validateId, (request, response) => {
  const { id } = request.params;

  const deleteUser = new DeleteUserService(usersRepository);

  deleteUser.execute({ id });

  return response.status(204).send();
});

export default usersRouter;

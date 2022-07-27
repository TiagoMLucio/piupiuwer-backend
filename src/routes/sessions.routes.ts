import {
  NextFunction, Request, Response, Router,
} from 'express';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from '../services/SessionServices/AuthenticateUserService';
import CreateUserService from '../services/SessionServices/CreateUserService';

const sessionsRouter = Router();

const validateData = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const {
    name, email, password, birth_date, cpf, phone,
  } = request.body;

  if (!name || !email || !password || !cpf || !birth_date || !phone) {
    throw new AppError('Parâmetros inválidos');
  }

  return next();
};

sessionsRouter.post('/register', validateData, async (request, response) => {
  const data = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute(data);

  return response.json(user);
});

sessionsRouter.post('/login', async (request, response) => {
  const data = request.body;

  const authenticateuser = new AuthenticateUserService();

  const { user, token } = await authenticateuser.execute(data);

  return response.json({ user, token });
});

export default sessionsRouter;

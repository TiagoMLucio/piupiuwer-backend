import AppError from '@shared/errors/AppError';
import {
  NextFunction, Request, Response, Router,
} from 'express';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

const validateData = (
  request: Request,
  _: Response,
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

usersRouter.post('/', validateData, usersController.create);

export default usersRouter;

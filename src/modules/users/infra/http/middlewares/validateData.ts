import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

const validateData = (withPassword = false) => (
  request: Request,
  _: Response,
  next: NextFunction,
) => {
  const {
    name, email, password, birth_date, cpf, phone,
  } = request.body;

  if (!name || !email || !cpf || !birth_date || !phone || (withPassword && !password)) {
    throw new AppError('Parâmetros inválidos');
  }

  return next();
};

export default validateData;

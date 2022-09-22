import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

const validateData = (withPassword = false) => (
  request: Request,
  _: Response,
  next: NextFunction,
) => {
  const {
    name, email, password, birth_date, cpf, phone, username,
  } = request.body;

  if (!name || !username || !email || !cpf || !birth_date || !phone || (withPassword && !password)) {
    throw new AppError('Invalid Parameters');
  }

  return next();
};

export default validateData;

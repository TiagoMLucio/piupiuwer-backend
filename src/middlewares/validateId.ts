import { NextFunction, Request, Response } from 'express';
import { isUuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';

export default function validateId(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.params;

  if (!isUuid(id)) throw new AppError('ID inválido');

  return next();
}

import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { validate } from 'uuid';

export default function validateId(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.params;

  if (!validate(id)) throw new AppError('Invalid ID');

  return next();
}

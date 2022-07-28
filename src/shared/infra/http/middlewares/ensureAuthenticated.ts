import { Request, Response, NextFunction } from 'express';
import { JwtPayload, Secret, verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '../../../../config/auth';

export default function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');

  const decoded = verify(token, authConfig.jwt.secret as Secret);

  const { sub } = decoded as JwtPayload;

  request.user = {
    id: sub as string,
  };

  return next();
}

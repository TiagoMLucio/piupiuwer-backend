/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '@config/swagger';

import AppError from '@shared/errors/AppError';
import routes from './routes';
import '@shared/container';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const logRequests = (
  request: Request,
  _response: Response,
  next: () => void,
) => {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
};

app.use(logRequests);

app.use(routes);

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Server started on port ${process.env.PORT || 3333}!`);
});

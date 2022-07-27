import { Router } from 'express';
import piusRouter from './pius.routes';
import sessionRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/pius', piusRouter);
routes.use('/sessions', sessionRouter);

export default routes;

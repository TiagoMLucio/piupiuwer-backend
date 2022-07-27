import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import PiusController from '../controllers/PiusController';

const piusRouter = Router();
const piusController = new PiusController();

piusRouter.use(ensureAuthenticated);

piusRouter.post('/', piusController.create);

export default piusRouter;

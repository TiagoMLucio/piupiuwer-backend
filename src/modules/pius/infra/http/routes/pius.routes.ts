import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import PiusController from '../controllers/PiusController';

const piusRouter = Router();
const piusController = new PiusController();

piusRouter.use(ensureAuthenticated);

piusRouter.post('/', piusController.create);
piusRouter.get('/', piusController.show);

export default piusRouter;

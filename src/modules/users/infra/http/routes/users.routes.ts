import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import validateId from '@shared/infra/http/middlewares/validateId';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserUpdateAvatarController from '../controllers/UserUpdateAvatarController';
import validateData from '../middlewares/validateData';

const usersRouter = Router();
const usersController = new UsersController();
const userUpdateAvatarController = new UserUpdateAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', validateData(true), usersController.create);

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', usersController.show);

usersRouter.get('/:id', validateId, usersController.showById);

usersRouter.put('/', validateData(), usersController.update);

usersRouter.patch('/avatar', upload.single('avatar'), userUpdateAvatarController.update);

usersRouter.delete('/:id', validateId, usersController.delete);

export default usersRouter;

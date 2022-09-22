import express, {
  NextFunction, Request, Response, Router,
} from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import validateId from '@shared/infra/http/middlewares/validateId';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import path from 'path';
import AppError from '@shared/errors/AppError';
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

usersRouter.patch('/avatar', upload.fields([{ name: 'body' }, { name: 'avatar' }]), express.static(uploadConfig.directory), userUpdateAvatarController.update);

usersRouter.delete('/:id', validateId, usersController.delete);

const videoStorage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'tmp'),
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()
    }${path.extname(file.originalname)}`);
  },
});

const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error('Please upload a video'));
    }
    return cb(null, true);
  },
});

usersRouter.post('/uploadVideo', videoUpload.single('video'), (req: Request, res: Response) => {
  res.send(req.file);
}, (error: AppError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(400).send({ error: error.message });
});

export default usersRouter;

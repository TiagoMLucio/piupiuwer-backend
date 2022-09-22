import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserUpdateAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserService = container.resolve(UpdateUserAvatarService);

    console.log(req.files, req.body);

    const file = req.files as {[filename: string]: Express.Multer.File[]};

    const userData = req.body;

    const userWithoutPassword = await updateUserService.execute({
      user_id: req.user.id,
      avatarFileName: file ? file?.avatar[0].filename : '',
      ...userData,
    });

    return res.json(userWithoutPassword);
  }
}

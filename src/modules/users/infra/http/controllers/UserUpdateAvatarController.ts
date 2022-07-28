import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserUpdateAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserService.execute({
      user_id: req.user.id,
      avatarFileName: req.file ? req.file.filename : '',
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.json(userWithoutPassword);
  }
}

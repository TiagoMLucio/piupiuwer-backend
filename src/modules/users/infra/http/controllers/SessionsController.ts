import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { userWithoutPassword, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return res.json({ user: userWithoutPassword, token });
  }
}

import { Request, Response } from 'express';
import CreateUserService from 'services/SessionServices/CreateUserService';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute(data);

    const { password: _, ...userWithoutPassword } = user;

    return res.json(userWithoutPassword);
  }
}

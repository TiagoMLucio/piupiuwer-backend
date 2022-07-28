import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ShowOneUserService from '@modules/users/services/ShowOneUserService';
import ShowUsersService from '@modules/users/services/ShowUsersService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute(data);

    const { password: _, ...userWithoutPassword } = user;

    return res.json(userWithoutPassword);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showUsersService = container.resolve(ShowUsersService);

    const users = await showUsersService.execute();

    const usersWithoutPassword = users.map((user) => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return res.json(usersWithoutPassword);
  }

  public async showOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOneUsersService = container.resolve(ShowOneUserService);

    const user = await showOneUsersService.execute({ id });

    if (!user) throw new AppError('User not found', 404);

    const { password: _, ...userWithoutPassword } = user;

    return res.json(userWithoutPassword);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({ id: req.user.id, ...data });

    const { password: _, ...userWithoutPassword } = user;

    return res.json(userWithoutPassword);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute(id);

    return res.json();
  }
}

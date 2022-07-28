import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ShowByIdUserService from '@modules/users/services/ShowByIdUserService';
import ShowByUsernameUserService from '@modules/users/services/ShowByUsernameService';
import ShowUsersService from '@modules/users/services/ShowUsersService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const createUserService = container.resolve(CreateUserService);

    const userWithoutPassword = await createUserService.execute(data);

    return res.json(userWithoutPassword);
  }

  public async show(req: Request, res: Response) {
    const { username } = req.query;

    if (username) {
      const showByUsernameUserService = container.resolve(ShowByUsernameUserService);

      const userWithoutPassword = await showByUsernameUserService.execute({ username: username as string });

      return res.json(userWithoutPassword);
    }

    const showUsersService = container.resolve(ShowUsersService);

    const usersWithoutPassword = await showUsersService.execute();

    return res.json(usersWithoutPassword);
  }

  public async showById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showByIdUsersService = container.resolve(ShowByIdUserService);

    const userWithoutPassword = await showByIdUsersService.execute({ id });

    return res.json(userWithoutPassword);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const updateUserService = container.resolve(UpdateUserService);

    const userWithoutPassword = await updateUserService.execute({ id: req.user.id, ...data });

    return res.json(userWithoutPassword);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute(id);

    return res.json();
  }
}

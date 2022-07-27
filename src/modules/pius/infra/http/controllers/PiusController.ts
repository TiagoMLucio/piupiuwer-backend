import CreatePiuService from '@modules/pius/services/CreatePiuService';
import ShowPiusService from '@modules/pius/services/ShowPiusService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class PiusController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id, text } = req.body;
    const loggedUser = req.user;

    const createPiusService = container.resolve(CreatePiuService);

    const piu = await createPiusService.execute({ user_id, text, loggedUser });

    return res.json(piu);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showPiusService = container.resolve(ShowPiusService);

    const pius = await showPiusService.execute();

    return res.json(pius);
  }
}

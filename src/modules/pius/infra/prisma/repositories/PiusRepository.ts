import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import client from '@shared/infra/prisma/client';
import Piu from 'models/Pius';

export default class PiusRepository implements IPiusRepository {
  private ormRepository;

  constructor() {
    this.ormRepository = client.piu;
  }

  public create({ user_id, text }: ICreatePiuDTO): Promise<Piu> {
    const piu = this.ormRepository.create({ data: { user_id, text } });

    return piu;
  }
}

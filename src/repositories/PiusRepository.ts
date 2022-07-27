import Piu from '../models/Pius';

interface IGetPiuDTO {
  index: number;
}

interface ICreatePiuDTO {
  user_id: string;
  text: string;
}

interface IUpdatePiuDTO {
  index: number;
  data: {
    text: string;
  };
}

interface IDeletePiuDTO {
  index: number;
}

class PiuRepository {
  private pius: Piu[];

  constructor() {
    this.pius = [];
  }

  public all(): Piu[] {
    return this.pius;
  }

  public get({ index }: IGetPiuDTO): Piu {
    return this.pius[index];
  }

  public create(data: ICreatePiuDTO): Piu {
    const piu = new Piu(data);

    this.pius.push(piu);

    return piu;
  }

  public update({ index, data }: IUpdatePiuDTO): Piu {
    // eslint-disable-next-line no-return-assign
    return (this.pius[index] = {
      ...this.pius[index],
      ...data,
      updated_at: new Date(),
    });
  }

  public delete({ index }: IDeletePiuDTO) {
    this.pius.splice(index, 1);
  }

  public findIndexById(id: string): number {
    return this.pius.findIndex((piu: Piu) => piu.id === id);
  }
}

export default PiuRepository;

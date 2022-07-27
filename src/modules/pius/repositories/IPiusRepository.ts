import Piu from 'models/Pius';

interface IPiusRepository {
  create(data: ICreatePiuDTO): Promise<Piu>;
  find(): Promise<Piu[]>;
}

export default IPiusRepository;

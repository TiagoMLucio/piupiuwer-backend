import User from '../models/Users';

interface IGetUserDTO {
  index: number;
}

interface ICreateUserDTO {
  name: string;
  birth_date: Date;
  cpf: string;
  phone: string;
}

interface IUpdateUserDTO {
  index: number;
  data: ICreateUserDTO;
}

interface IDeleteUserDTO {
  index: number;
}

class UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public all(): User[] {
    return this.users;
  }

  public get({ index }: IGetUserDTO): User {
    return this.users[index];
  }

  public create(data: ICreateUserDTO): User {
    const user = new User(data);

    this.users.push(user);

    return user;
  }

  public update({ index, data }: IUpdateUserDTO): User {
    // eslint-disable-next-line no-return-assign
    return (this.users[index] = {
      ...this.users[index],
      ...data,
      updated_at: new Date(),
    });
  }

  public delete({ index }: IDeleteUserDTO) {
    this.users.splice(index, 1);
  }

  public findIndexById(id: string): number {
    return this.users.findIndex((user: User) => user.id === id);
  }

  public findIndexByCpf(cpf: string): number {
    return this.users.findIndex((user: User) => user.cpf === cpf);
  }
}

export default UserRepository;

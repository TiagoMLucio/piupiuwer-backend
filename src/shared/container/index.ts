import PiusRepository from '@modules/pius/infra/prisma/repositories/PiusRepository';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositores/IUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IPiusRepository>('PiusRepository', PiusRepository);

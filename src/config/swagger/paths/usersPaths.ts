import { OpenAPIV3 } from 'openapi-types';
import usersComponent from '../schemas/usersComponent';

const usersPaths: OpenAPIV3.PathsObject = {
  '/users': {
    post: {
      summary: 'Criar usuário',
      description: 'Documentação de como criar um novo usuário',
      tags: ['Users'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                cpf: { type: 'string' },
                birth_date: { type: 'string' },
                phone: { type: 'string' },
                about: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                ...usersComponent?.User,
              },
            },
          },
        },
      },
    },
  },
};

export default usersPaths;

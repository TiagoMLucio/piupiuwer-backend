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
                username: { type: 'string' },
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
    put: {
      summary: 'Editar dados do usuário',
      description: 'Documentação de como editar os dados do usuário logado',
      tags: ['Users'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
                name: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string' },
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
    get: {
      summary: 'Listar usuários',
      description: 'Documentação de como listar todos os usuários',
      tags: ['Users'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'username',
          in: 'query',
        },
        {
          name: 'page',
          in: 'query',
        },
        {
          name: 'take',
          in: 'query',
        },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  pius: {
                    type: 'array',
                    items: { ...usersComponent?.User },
                  },
                  total: {
                    type: 'integer',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/users/{id}': {
    get: {
      summary: 'Listar usuário',
      description: 'Documentação de como listar um usuário específico',
      tags: ['Users'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
        },
      ],
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
    delete: {
      summary: 'Deletar usuário',
      description: 'Documentação de como deletar um usuário específico',
      tags: ['Users'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
        },
      ],
      responses: {
        200: {
          description: 'OK',
        },
      },
    },
  },
  '/users/avatar': {
    patch: {
      summary: 'Editar avatar do usuário',
      description: 'Documentação de como editar o avatar do usuário logado',
      tags: ['Users'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { ...usersComponent?.User },
              },
            },
          },
        },
      },
    },
  },
};

export default usersPaths;

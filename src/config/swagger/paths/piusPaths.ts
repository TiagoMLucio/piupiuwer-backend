import { OpenAPIV3 } from 'openapi-types';
import piusComponent from '../schemas/piusComponent';

const piusPaths: OpenAPIV3.PathsObject = {
  '/pius': {
    post: {
      summary: 'Criar pius',
      description: 'Documentação de como criar um novo piu do usuário logado',
      tags: ['Pius'],
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
                text: { type: 'string' },
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
                ...piusComponent?.Piu,
              },
            },
          },
        },
      },
    },
    get: {
      summary: 'Listar pius',
      description: 'Documentação de como listar todos os pius',
      tags: ['Pius'],
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
                items: { ...piusComponent?.Piu },
              },
            },
          },
        },
      },
    },
  },
};

export default piusPaths;

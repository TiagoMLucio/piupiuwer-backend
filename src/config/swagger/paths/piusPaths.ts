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
      parameters: [
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
                    items: { ...piusComponent?.Piu },
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
};

export default piusPaths;

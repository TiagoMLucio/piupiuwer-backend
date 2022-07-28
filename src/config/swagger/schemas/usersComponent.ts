import { OpenAPIV3 } from 'openapi-types';

const usersComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  User: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      username: { type: 'string' },
      email: { type: 'string' },
      cpf: { type: 'string' },
      birth_date: { type: 'string' },
      phone: { type: 'string' },
      about: { type: 'string' },
      avatar: { type: 'string' },
      created_at: { type: 'string' },
      updated_at: { type: 'string' },
    },
  },
};

export default usersComponent;

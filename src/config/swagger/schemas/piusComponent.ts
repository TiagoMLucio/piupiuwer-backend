import { OpenAPIV3 } from 'openapi-types';

const piusComponent: OpenAPIV3.ComponentsObject['schemas'] = {
  Piu: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      user_id: { type: 'string' },
      text: { type: 'string' },
      created_at: { type: 'string' },
      updated_at: { type: 'string' },
    },
  },
};

export default piusComponent;

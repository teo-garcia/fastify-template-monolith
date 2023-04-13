// TODO: Use Fluent-Schema instead
const TodosSchema = {
  get: {
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
      },
      required: ['id'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          description: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
        },
        required: ['id', 'description', 'status'],
      },
    },
  },
  getAll: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
            },
            description: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
          },
          required: ['id', 'description', 'status'],
        },
      },
    },
  },
  add: {
    body: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
        },
        status: {
          type: 'string',
          default: 'to-do',
        },
      },
      required: ['description'],
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          description: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
        },
        required: ['id', 'description', 'status'],
      },
    },
  },
  update: {
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
      },
      required: ['id'],
    },
    body: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
        },
        status: {
          type: 'string',
          default: 'todo',
        },
      },
      required: ['description'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          description: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
        },
        required: ['id', 'description', 'status'],
      },
    },
  },
  remove: {
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
      },
      required: ['id'],
    },
  },
}

export { TodosSchema }

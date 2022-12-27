// TODO: Use Fluent-Schema instead
const TodoSchema = {
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
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
        },
        required: ['id', 'title', 'description', 'status'],
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
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            status: {
              type: 'string',
            },
          },
          required: ['id', 'title', 'description', 'status'],
        },
      },
    },
  },
  add: {
    body: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        status: {
          type: 'string',
          default: 'todo',
        },
      },
      required: ['title'],
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
        },
        required: ['id', 'title', 'description', 'status'],
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
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        status: {
          type: 'string',
          default: 'todo',
        },
      },
      required: ['title'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
        },
        required: ['id', 'title', 'description', 'status'],
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

export { TodoSchema }

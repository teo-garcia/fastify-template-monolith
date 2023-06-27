const UsersSchema = {
  signUp: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
          format: 'email',
        },
        password: {
          type: 'string',
          minLength: 6,
        },
      },
      required: ['name', 'email', 'password'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          role: {
            type: 'string',
            enum: ['user', 'admin'],
          },
        },
        required: ['name', 'email', 'role'],
      },
      409: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
        required: ['message'],
      },
    },
  },
  signIn: {
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
        },
        password: {
          type: 'string',
          minLength: 6,
        },
      },
      required: ['email', 'password'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          headers: {
            type: 'object',
            properties: {
              authorization: { type: 'string' },
            },
            required: ['authorization'],
          },
          user: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
                format: 'email',
              },
            },
            required: ['name', 'email'],
          },
        },
        required: ['headers', 'user'],
      },
      401: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
        required: ['message'],
      },
    },
  },
  update: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        password: {
          type: 'string',
          minLength: 6,
        },
      },
      minProperties: 1,
    },
    response: {
      204: {},
      500: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
        required: ['message'],
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
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
          },
          required: ['name', 'email'],
        },
      },
      500: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
        required: ['message'],
      },
    },
  },
}

export { UsersSchema }

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
        },
        required: ['name', 'email'],
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
        },
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
}

export { UsersSchema }

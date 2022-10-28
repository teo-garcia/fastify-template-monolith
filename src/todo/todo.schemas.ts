// TODO: Use Fluent-Schema instead
export default {
  get: {
    params: {
      type: "object",
      properties: {
        id: {
          type: "number",
        },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          title: {
            type: "string",
            required: true,
          },
          description: {
            type: "string",
          },
          status: {
            type: "string",
          },
        },
      },
    },
  },
  getAll: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              required: true,
            },
            description: {
              type: "string",
            },
            status: {
              type: "string",
            },
          },
        },
      },
    },
  },
  post: {
    body: {
      type: "object",
      properties: {
        title: {
          type: "string",
          required: true,
        },
        description: {
          type: "string",
        },
        status: {
          type: "string",
          default: "todo",
        },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          title: {
            type: "string",
            required: true,
          },
          description: {
            type: "string",
          },
          status: {
            type: "string",
          },
        },
      },
    },
  },
};

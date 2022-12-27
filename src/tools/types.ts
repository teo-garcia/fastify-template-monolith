import type { FastifyReply, FastifyRequest } from 'fastify'

/* Todo Types */
export type Todo = {
  title: string
  description?: string
  status?: string
}

export type TodoRequest = {
  GET: {
    Params: {
      id: number
    }
  }
  ADD: {
    Body: Todo
  }
  UPDATE: {
    Body: Todo
    Params: {
      id: number
    }
  }
  REMOVE: {
    Params: {
      id: number
    }
  }
}

export type TodoControllerLike = {
  GET: (
    request: FastifyRequest<TodoRequest['GET']>,
    reply: FastifyReply
  ) => Promise<void>
  GET_ALL: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  ADD: (
    request: FastifyRequest<TodoRequest['ADD']>,
    reply: FastifyReply
  ) => Promise<void>
  UPDATE: (
    request: FastifyRequest<TodoRequest['UPDATE']>,
    reply: FastifyReply
  ) => Promise<void>
  REMOVE: (
    request: FastifyRequest<TodoRequest['REMOVE']>,
    reply: FastifyReply
  ) => Promise<void>
}

export class HttpError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

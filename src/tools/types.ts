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

/* User Types */
export type User = {
  name: string
  email: string
  password: string
}

export type UserRequest = {
  SIGN_UP: {
    Body: User
  }
  SIGN_IN: {
    Body: Omit<User, 'name'>
  }
}

export type UserControllerLike = {
  SIGN_UP: (
    request: FastifyRequest<UserRequest['SIGN_UP']>,
    reply: FastifyReply
  ) => Promise<void>
  SIGN_IN: (
    request: FastifyRequest<UserRequest['SIGN_IN']>,
    reply: FastifyReply
  ) => Promise<void>
}

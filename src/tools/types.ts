import type { FastifyReply, FastifyRequest } from 'fastify'

/* Todo Types */
export type Todo = {
  id?: number
  description: string
  status: string
}

export type TodosRequest = {
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

export type TodosControllerLike = {
  GET: (
    request: FastifyRequest<TodosRequest['GET']>,
    reply: FastifyReply
  ) => Promise<void>
  GET_ALL: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  ADD: (
    request: FastifyRequest<TodosRequest['ADD']>,
    reply: FastifyReply
  ) => Promise<void>
  UPDATE: (
    request: FastifyRequest<TodosRequest['UPDATE']>,
    reply: FastifyReply
  ) => Promise<void>
  REMOVE: (
    request: FastifyRequest<TodosRequest['REMOVE']>,
    reply: FastifyReply
  ) => Promise<void>
}

/* User Types */
export type User = {
  id: number
  name: string
  email: string
  password: string
}

export type UserRequest = {
  SIGN_UP: {
    Body: Omit<User, 'id'>
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

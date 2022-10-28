import type { FastifyReply, FastifyRequest } from "fastify";
import type { Todo } from "../types";
import todoService from "./todo.service";

export type GetRequest = {
  Params: {
    id: number;
  };
};

export type UpdateRequest = {
  Body: Todo;
  Params: {
    id: number;
  };
};

export type AddRequest = {
  Body: Todo;
};

export type RemoveRequest = {
  Params: {
    id: number;
  };
};

function get(request: FastifyRequest<GetRequest>, reply: FastifyReply) {
  const { id } = request.params;
  const todo = todoService.get(id);

  reply.send(todo);
}

function getAll(request: FastifyRequest, reply: FastifyReply) {
  const todos = todoService.getAll();
  reply.send(todos);
}

function add(request: FastifyRequest<AddRequest>, reply: FastifyReply) {
  const newTodo = request.body;
  const addedTodo = todoService.add(newTodo);
  reply.code(201).send(addedTodo);
}

function update(request: FastifyRequest<UpdateRequest>, reply: FastifyReply) {
  const { id } = request.params;
  const newTodo = request.body;
  const updatedTodo = todoService.update(id, newTodo);
  reply.send(updatedTodo);
}

function remove(request: FastifyRequest<RemoveRequest>, reply: FastifyReply) {
  const { id } = request.params;
  todoService.remove(id);
  reply.code(204).send();
}

export default { get, getAll, add, update, remove };

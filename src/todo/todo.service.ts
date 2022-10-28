import { Todo } from "../types";

function get(id: number) {
  return {};
}

function getAll() {
  return [{}, {}, {}];
}

function add(todo: Todo) {
  return todo;
}

function update(id: number, todo: Partial<Todo>) {
  return todo;
}

function remove(id: number) {}

export default { get, getAll, add, update, remove };

import type { Todo as TodoType } from "../tools/types";
import Todo from "./todo.model";

async function get(id: number) {
  const todo = await Todo.findByPk(id);

  return todo;
}

async function getAll() {
  const todos = await Todo.findAll();
  return todos;
}

async function add(todo: TodoType) {
  const createdTodo = await Todo.create(todo);
  return createdTodo;
}

function update(id: number, todo: Partial<TodoType>) {
  return todo;
}

function remove(id: number) {}

export default { get, getAll, add, update, remove };

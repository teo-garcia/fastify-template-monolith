import { faker } from '@faker-js/faker'
import { Todo } from '@tools/types'
import type { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Seeding is not allowed in the production environment.')
  }

  await knex('todos').del()
  const userCount = 30
  const todosPerUser = 8

  const todos: Array<Todo> = Array.from({ length: userCount }, (_, index) => {
    const userId = index + 1

    return Array.from({ length: todosPerUser }, () => ({
      description: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(['to-do', 'in-progress', 'done']),
      user_id: userId,
    }))
  }).flatMap((userTodos) => userTodos)

  await knex('todos').insert(todos)
}

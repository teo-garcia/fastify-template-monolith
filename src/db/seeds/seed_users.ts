import type { Knex } from 'knex'
import { faker } from '@faker-js/faker'
import type { User } from '@tools/types'

export async function seed(knex: Knex): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Seeding is not allowed in the production environment.')
  }

  await knex('users').del()

  const users: Array<User> = Array.from({ length: 30 }).map((_, index) => ({
    id: ++index,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }))

  console.log(users)

  await knex('users').insert(users)
}

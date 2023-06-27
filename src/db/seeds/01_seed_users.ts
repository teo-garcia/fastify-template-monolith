import type { Knex } from 'knex'
import { faker } from '@faker-js/faker'
import type { User } from '@tools/types'

export async function seed(knex: Knex): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Seeding is not allowed in the production environment.')
  }

  await knex('users').del()

  const users: Array<Omit<User, 'id'>> = Array.from({ length: 30 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(['user', 'admin']),
  }))

  await knex('users').insert(users)
}

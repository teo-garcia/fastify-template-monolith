import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('todos', function (table) {
    table.increments('id').primary()
    table.text('description')
    table.string('status')
    table.integer('user_id').references('id').inTable('users')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('todos')
}

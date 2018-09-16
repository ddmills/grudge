
exports.up = (knex) => {
  return knex.schema.createTable('decks', (t) => {
    t.string('id').notNull().primary();
    t.string('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    t.string('lobbyId')
      .references('id')
      .inTable('lobbies')
      .onDelete('CASCADE');
    t.timestamp('createdAt').notNull().defaultTo(knex.fn.now(6));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('decks');
};


exports.up = (knex) => {
  return knex.schema.createTable('lobbies', (t) => {
    t.string('id').notNull().primary();
    t.string('ownerId')
      .references('id')
      .inTable('users')
      .notNull();
    t.boolean('isPublic').defaultTo(true);
    t.integer('maxNumberOfPlayers').defaultTo(3);
    t.dateTime('createdAt').defaultTo(knex.fn.now(6));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('lobbies');
};

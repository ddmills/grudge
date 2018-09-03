
exports.up = (knex) => {
  return knex.schema.createTable('lobbies', (t) => {
    t.string('id').notNull().primary();
    t.string('ownerId')
      .references('id')
      .inTable('users')
      .notNull();
    t.boolean('isPublic').defaultTo(true);
    t.integer('maxNumberOfPlayers').defaultTo(3);
    t.timestamp('createdAt').notNull().defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('lobbies');
};

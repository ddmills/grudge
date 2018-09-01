
exports.up = (knex) => {
  return knex.schema.createTable('users', (t) => {
    t.string('id').notNull().primary();
    t.string('name');
    t.string('displayName');
    t.string('avatar');
    t.dateTime('createdAt').defaultTo(knex.fn.now(6));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};

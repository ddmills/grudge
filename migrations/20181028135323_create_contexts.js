
exports.up = (knex) => {
  return knex.schema.createTable('contexts', (t) => {
    t.string('id').notNull().primary();
    t.timestamp('createdAt').notNull().defaultTo(knex.fn.now());
    t.jsonb('state').defaultTo('{}');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('contexts');
};

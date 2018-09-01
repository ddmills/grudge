
exports.up = (knex) => {
  return knex.schema.createTable('openids', (t) => {
    t.string('id').notNull().primary();
    t.string('userId')
      .references('id')
      .inTable('users')
      .notNull()
      .onDelete('cascade');
    t.string('identityUrl').notNull();
    t.string('provider').notNull();
    t.string('providerId').notNull();
    t.dateTime('createdAt').defaultTo(knex.fn.now(6));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('openids');
};


exports.up = (knex) => {
  return knex.schema.createTable('openids', (t) => {
    t.string('id').notNull().primary();
    t.string('userId')
      .index()
      .references('id')
      .inTable('users')
      .notNull()
      .onDelete('cascade');
    t.string('identityUrl').notNull();
    t.string('provider').notNull();
    t.string('providerId').notNull();
    t.timestamp('createdAt').notNull().defaultTo(knex.fn.now(6));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('openids');
};

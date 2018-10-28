
exports.up = (knex) => {
  return knex.schema.table('users', (t) => {
    t.string('contextId')
      .references('id')
      .inTable('contexts')
      .onDelete('SET NULL');
  });
};

exports.down = (knex) => {
  return knex.schema.table('users', (t) => {
    t.dropColumn('contextId');
  });
};

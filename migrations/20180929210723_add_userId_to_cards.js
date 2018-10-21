
exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.string('userId')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('userId');
  });
};

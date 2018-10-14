
exports.up = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.string('winnerId')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
  });
};

exports.down = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.dropColumn('winnerId');
  });
};

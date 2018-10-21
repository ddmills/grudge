
exports.up = (knex) => {
  return knex.schema.table('users', (t) => {
    t.string('lobbyId')
      .references('id')
      .inTable('lobbies')
      .onDelete('SET NULL');
  });
};

exports.down = (knex) => {
  return knex.schema.table('users', (t) => {
    t.dropColumn('lobbyId');
  });
};

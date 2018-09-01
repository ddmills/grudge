
exports.up = (knex) => {
  return knex.schema.table('users', (t) => {
    t.string('lobbyId')
      .index()
      .references('id')
      .inTable('lobbies')
      .onDelete('cascade');
  });
};

exports.down = (knex) => {
  return knex.schema.table('users', (t) => {
    t.dropColumn('lobbyId');
  });
};


exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.string('lobbyId')
      .references('id')
      .inTable('lobbies')
      .onDelete('CASCADE');
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('lobbyId');
  });
};

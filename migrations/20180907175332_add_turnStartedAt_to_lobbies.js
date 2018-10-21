
exports.up = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.timestamp('turnStartedAt');
  });
};

exports.down = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.dropColumn('turnStartedAt');
  });
};

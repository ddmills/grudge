
exports.up = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.timestamp('startedAt');
  });
};

exports.down = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.dropColumn('startedAt');
  });
};

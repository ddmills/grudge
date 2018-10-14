
exports.up = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.timestamp('endedAt');
  });
};

exports.down = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.dropColumn('endedAt');
  });
};

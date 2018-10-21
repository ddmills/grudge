
exports.up = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.timestamp('countdownStartedAt');
  });
};

exports.down = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.dropColumn('countdownStartedAt');
  });
};

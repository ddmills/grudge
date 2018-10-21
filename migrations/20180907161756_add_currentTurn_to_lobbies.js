
exports.up = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.integer('currentTurn').defaultsTo(0);
  });
};

exports.down = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.dropColumn('currentTurn');
  });
};

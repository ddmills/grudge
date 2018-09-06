
exports.up = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.integer('countdownDuration').defaultTo(10000);
  });
};

exports.down = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.dropColumn('countdownDuration');
  });
};

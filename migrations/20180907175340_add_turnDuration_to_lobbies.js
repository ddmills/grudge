
exports.up = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.integer('turnDuration').defaultTo(10000);
  });
};

exports.down = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.dropColumn('turnDuration');
  });
};

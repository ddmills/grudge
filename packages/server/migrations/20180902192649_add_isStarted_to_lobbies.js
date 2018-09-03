
exports.up = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.boolean('isStarted').defaultTo(false);
  });
};

exports.down = (knex) => {
  return knex.schema.table('lobbies', (t) => {
    t.dropColumn('isStarted');
  });
};

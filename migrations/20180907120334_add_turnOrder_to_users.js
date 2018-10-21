
exports.up = (knex) => {
  return knex.schema.table('users', (t) => {
    t.integer('turnOrder');
  });
};

exports.down = (knex) => {
  return knex.schema.table('users', (t) => {
    t.dropColumn('turnOrder');
  });
};

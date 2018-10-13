
exports.up = (knex) => {
  return knex.schema.table('users', (t) => {
    t.integer('health').defaultTo(0);
  });
};

exports.down = (knex) => {
  return knex.schema.table('users', (t) => {
    t.dropColumn('health');
  });
};

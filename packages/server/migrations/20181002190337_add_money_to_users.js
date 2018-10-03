
exports.up = (knex) => {
  return knex.schema.table('users', (t) => {
    t.integer('money').defaultTo(0);
  });
};

exports.down = (knex) => {
  return knex.schema.table('users', (t) => {
    t.dropColumn('money');
  });
};

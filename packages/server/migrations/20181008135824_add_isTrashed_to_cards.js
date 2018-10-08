
exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.boolean('isTrashed').defaultTo(false);
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('isTrashed');
  });
};

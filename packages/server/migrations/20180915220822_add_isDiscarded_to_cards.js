
exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.boolean('isDiscarded').defaultTo(false);
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('isDiscarded');
  });
};

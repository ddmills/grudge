
exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('isPlayed');
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.boolean('isPlayed').defaultTo(false);
  });
};

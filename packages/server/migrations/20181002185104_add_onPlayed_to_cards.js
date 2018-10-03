
exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.jsonb('onPlayed').defaultTo('[]');
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('onPlayed');
  });
};

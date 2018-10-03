
exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.jsonb('onDrawn').defaultTo('[]');
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('onDrawn');
  });
};


exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.boolean('isDrawn').defaultTo(false);
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('isDrawn');
  });
};

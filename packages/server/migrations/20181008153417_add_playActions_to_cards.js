
exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.jsonb('playActions').defaultTo('[]');
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('playActions');
  });
};

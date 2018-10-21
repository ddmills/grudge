
exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.jsonb('handActions').defaultTo('[]');
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('handActions');
  });
};

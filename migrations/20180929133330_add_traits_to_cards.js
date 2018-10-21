
exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.jsonb('traits').defaultTo('[]');
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('traits');
  });
};


exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.jsonb('onDestroyed').defaultTo('[]');
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('onDestroyed');
  });
};

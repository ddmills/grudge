
exports.up = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.integer('slotIndex');
  });
};

exports.down = (knex) => {
  return knex.schema.table('cards', (t) => {
    t.dropColumn('slotIndex');
  });
};

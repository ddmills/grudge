
exports.up = (knex) => {
  return knex.schema.createTable('cards', (t) => {
    t.string('id').notNull().primary();
    t.string('deckId')
      .references('id')
      .inTable('decks')
      .onDelete('CASCADE');
    t.string('cardTypeId').notNull();
    t.timestamp('createdAt').notNull().defaultTo(knex.fn.now(6));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('cards');
};

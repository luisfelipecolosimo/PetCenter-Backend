
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('location').notNullable();
    table.decimal('photoPath').notNullable();

    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('user');
});
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};

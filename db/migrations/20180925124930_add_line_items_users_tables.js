
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('line_items', function (table) {
      table.increments('id').primary();
      table.integer('order_id');
      table.integer('product_id');
      table.integer('price_in_cents')
      table.integer('quantity')
    }),
    knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('line_items'),
    knex.schema.dropTable('users'),
  ])
};

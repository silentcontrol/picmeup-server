
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('line_items', function (table) {
      table.increments('id').primary();
      table.integer('order_id');
      table.integer('product_id');
      table.integer('price_in_cents')
      table.integer('quantity')
    }),
    knex.schema.createTable('catalog', function (table) {
      table.increments('id');
      table.string('product_name');
      table.integer('price_in_cents')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('line_items'),
    knex.schema.dropTable('catalog'),
  ])
};

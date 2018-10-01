
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('line_items'),
    knex.schema.createTable('line_items', function (table) {
      table.increments('id').primary();
      table.integer('order_id');
      table.integer('product_id');
      table.integer('price_in_cents')
      table.integer('quantity')
      table.integer('line_total')
    }),
  ])
};

exports.down = function(knex, Promise) {
  
};

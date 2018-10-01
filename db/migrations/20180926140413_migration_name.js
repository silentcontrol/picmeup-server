
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('products'),
    knex.schema.createTable('products', function (table) {
      table.increments('id').primary();
      table.string('product_name');
      table.integer('price_in_cents')
    }),
  ])
};

exports.down = function(knex, Promise) {
  
};

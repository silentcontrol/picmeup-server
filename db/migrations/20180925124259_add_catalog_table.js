
exports.up = function(knex, Promise) {
    return knex.schema.createTable('catalog', function (table) {
      table.increments('id');
      table.string('product_name');
      table.integer('price_in_cents')
    })
};

exports.down = function(knex, Promise) {
  
};

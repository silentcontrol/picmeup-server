
exports.up = function(knex, Promise) {
      return knex.schema.createTable('orders', function(t) {
        t.increments('id').primary();
        t.integer('user_id');
        t.boolean('order_completed')
        t.timestamps(true, true);
      });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};

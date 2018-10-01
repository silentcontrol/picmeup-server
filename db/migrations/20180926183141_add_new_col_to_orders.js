
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders'),
    knex.schema.createTable('orders', function (table) {
      table.increments('id').primary();
      table.integer('user_id');
      table.boolean('order_completed')
      table.integer('order_total');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function (knex, Promise) {

};

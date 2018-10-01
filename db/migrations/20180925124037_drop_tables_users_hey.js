
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('line_items'),
    knex.schema.dropTable('catalog'),
  ])
};

exports.down = function(knex, Promise) {
  
};

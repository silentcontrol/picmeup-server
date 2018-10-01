
exports.up = function(knex, Promise) {
  return knex.schema.renameTable('catalog', 'products')
};

exports.down = function(knex, Promise) {
  
};

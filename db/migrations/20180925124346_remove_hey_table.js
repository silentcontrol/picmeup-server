
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('hey'),
  ])
};

exports.down = function(knex, Promise) {
  
};


exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
  ])
};

exports.down = function(knex, Promise) {
  
};

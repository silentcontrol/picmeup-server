
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
      table.string('token');
    })
  ])
};

exports.down = function(knex, Promise) {
  
};

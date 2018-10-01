var bcrypt = require('bcrypt');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert({ id: 1, first_name: 'Homer', last_name: 'Simpson', email: 'homer@simpsons.com', password: bcrypt.hashSync('123456', 10) }),
        knex('users').insert({ id: 2, first_name: 'Butters', last_name: 'Stotch', email: 'butters@southpark.com', password: bcrypt.hashSync('123456', 10) }),
        knex('users').insert({ id: 3, first_name: 'Rocket', last_name: 'Raccoon', email: 'raccoon@pestcontrol.com', password: bcrypt.hashSync('123456', 10) }),
        knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 4')
      ]);
    });
};

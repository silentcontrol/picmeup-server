
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('line_items').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex('line_items').insert({id: 1, order_id: 1, product_id: 10, price_in_cents: 500, quantity: 10, line_total: 5000}),
        knex('line_items').insert({id: 2, order_id: 1, product_id: 53, price_in_cents: 100, quantity: 3, line_total: 300}),
        knex('line_items').insert({id: 3, order_id: 1, product_id: 23, price_in_cents: 250, quantity: 5, line_total: 1250}),
        knex('line_items').insert({id: 4, order_id: 1, product_id: 62, price_in_cents: 30, quantity: 6, line_total: 180}),
        knex('line_items').insert({id: 5, order_id: 1, product_id: 60, price_in_cents: 20, quantity: 9, line_total: 180}),
        knex('line_items').insert({id: 6, order_id: 1, product_id: 12, price_in_cents: 100, quantity: 2, line_total: 200}),
        knex('line_items').insert({id: 7, order_id: 1, product_id: 23, price_in_cents: 30, quantity: 14, line_total: 420}),
        knex('line_items').insert({id: 8, order_id: 2, product_id: 12, price_in_cents: 525, quantity: 1, line_total: 525}),
        knex('line_items').insert({id: 9, order_id: 2, product_id: 50, price_in_cents: 234, quantity: 5, line_total: 1170}),
        knex('line_items').insert({id: 10, order_id: 2, product_id: 46, price_in_cents: 64, quantity: 2, line_total: 128}),
        knex('line_items').insert({id: 11, order_id: 2, product_id: 56, price_in_cents: 34, quantity: 7, line_total: 238}),
        knex('line_items').insert({id: 12, order_id: 2, product_id: 56, price_in_cents: 38, quantity: 1, line_total: 38}),
        knex('line_items').insert({id: 13, order_id: 3, product_id: 74, price_in_cents: 63, quantity: 1, line_total: 63}),
        knex('line_items').insert({id: 14, order_id: 3, product_id: 1, price_in_cents: 373, quantity: 1, line_total: 373}),
        knex('line_items').insert({id: 15, order_id: 3, product_id: 25, price_in_cents: 73, quantity: 2, line_total: 146}),
        knex('line_items').insert({id: 16, order_id: 4, product_id: 26, price_in_cents: 67, quantity: 3, line_total: 201}),
        knex('line_items').insert({id: 17, order_id: 4, product_id: 30, price_in_cents: 371, quantity: 6, line_total: 2226}),
        knex('line_items').insert({id: 18, order_id: 5, product_id: 64, price_in_cents: 345, quantity: 2, line_total: 690}),
        knex('line_items').insert({id: 19, order_id: 5, product_id: 42, price_in_cents: 213, quantity: 10, line_total: 2130}),
        knex('line_items').insert({id: 20, order_id: 5, product_id: 21, price_in_cents: 231, quantity: 1, line_total: 231}),
        knex('line_items').insert({id: 21, order_id: 5, product_id: 73, price_in_cents: 353, quantity: 2, line_total: 706}),
        knex('line_items').insert({id: 22, order_id: 5, product_id: 39, price_in_cents: 654, quantity: 5, line_total: 3270}),
        knex('line_items').insert({id: 23, order_id: 6, product_id: 62, price_in_cents: 452, quantity: 1, line_total: 452}),
        knex('line_items').insert({id: 24, order_id: 6, product_id: 81, price_in_cents: 213, quantity: 1, line_total: 213}),
        knex('line_items').insert({id: 25, order_id: 6, product_id: 72, price_in_cents: 124, quantity: 1, line_total: 124}),
        knex.raw('ALTER SEQUENCE line_items_id_seq RESTART WITH 26')
      ]);
    });
};

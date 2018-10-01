module.exports = function (knex) {
  return {
    // products table helper
    getAllProducts: async () => {
      return await
        knex('products')
          .orderBy('product_name', 'asc')
          .then(res => res).catch(function (e) {
            return 'cannot get product list';
          })
    },
    searchProductByName: async (name) => {
      let normalizedName = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
      return await
        knex('products')
          .where('product_name', normalizedName)
          .then(res => res).catch(function (e) {
            return 'product name cannot be found';
          })
    },
    // orders table helper
    getOpenOrders: async () => {
      return await
        knex('orders')
          .where('order_completed', false)
          .join('users', { 'orders.user_id': 'users.id' })
          .column(['orders.id', 'order_completed', 'order_total', 'created_at', 'updated_at', 'first_name', 'last_name', 'email'])
          .orderBy('created_at', 'desc')
          .then(res => res)
    },
    getClosedOrders: async () => {
      return await
        knex('orders')
          .where('order_completed', true)
          .join('users', { 'orders.user_id': 'users.id' })
          .column(['orders.id', 'order_completed', 'order_total', 'created_at', 'updated_at', 'first_name', 'last_name', 'email'])
          .orderBy('created_at', 'desc')
          .then(res => res)
    },
    // line_items table helper
    getOrderDetailsById: async (orderId) => {
      return await
        knex('line_items')
          .join('orders', 'line_items.order_id', '=', 'orders.id')
          .join('products', 'line_items.product_id', '=', 'products.id')
          .where('order_id', orderId)
          .column(['orders.id', 'product_name', 'line_items.price_in_cents', 'quantity', 'line_total', 'order_total', 'order_completed'])
          .then(res => res)
    },
    getUserByEmail: async (email) => {
      return await
        knex('users')
          .where('email', email)
          .column('email', 'password')
          .then(res => res)
    }
  };
}
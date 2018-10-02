module.exports = function (knex) {
  return {
    // products table helper
    addProduct: async (productName, priceInCents) => {
      return await
        knex('products')
          .insert([
            {
              product_name: productName,
              price_in_cents: priceInCents
            }
          ])
          .returning('*')
    },
    // users table helper
    addUser: async (firstName, lastName, email, password) => {
      return await
        knex('users')
          .insert([
            {
              first_name: firstName,
              last_name: lastName,
              email: email,
              password: password
            }
          ])
    },
    setUserToken: async (userId, tokenId) => {
      return await
        knex('users')
          .where({ id: `${userId}` })
          .update({ token: `${tokenId}` })
    },
    clearUserToken: async (userId) => {
      return await
        knex('users')
          .where({ id: `${userId}` })
          .update({ token: null })
    },
    // orders table helper
    addOrder: async (userId) => {
      return await
        knex('orders')
          .insert([
            {
              user_id: userId,
              order_completed: false
            }
          ])
          .returning('id');
    },
    addOrderTotal: async (orderId, orderTotal) => {
      return await
        knex('orders')
          .where({ id: `${orderId}` })
          .update({ order_total: `${orderTotal}` })
    },
    completeOrder: async (orderId) => {
      return await
        knex('orders')
          .where({ id: `${orderId}` })
          .update({ order_completed: true })
    },
    // line_items table helper
    addLineItem: async (orderId, productId, priceInCents, quantity) => {
      return await
        knex('line_items')
          .insert([
            {
              order_id: orderId,
              product_id: productId,
              price_in_cents: priceInCents,
              quantity: quantity,
              line_total: priceInCents * quantity
            }
          ])
    }
  };
}
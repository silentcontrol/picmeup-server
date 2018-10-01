const Knex = require('knex');

const config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
};

if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
  config.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

const knex = Knex({
  client: 'pg',
  connection: config
});

var dbQuery = require("../db/queryHelper")(knex);
var dbInsert = require("../db/insertHelper")(knex);


var express = require('express');
const router = express.Router();

//   AAAAA  DDDDDD  MM       MM IIIIIIII NN    NN
//  AA   AA DD   DD MMMM   MMMM    II    NNNN  NN
//  AA   AA DD   DD MM MM MM MM    II    NN NN NN
//  AAAAAAA DD   DD MM  MM   MM    II    NN  NNNN
//  AA   AA DDDDDD  MM       MM IIIIIIII NN    NN

/*  GET all open orders */
router.get('/orders', async (req, res) => {
  res.json(await dbQuery.getOpenOrders())
});

/* GET order details by order ID */
router.get('/orders/:id', async (req, res) => {
  const id = req.params.id;
  res.json(await dbQuery.getOrderDetailsById(id))
});

/* POST order ID - mark order as complete */
router.post('/orders/:id', async (req, res) => {
  // 2 is a placeholder for orderId
  // const id = req.params.id;
  const id = req.params.id;
  await dbInsert.completeOrder(id);
  res.sendStatus(200);
});

/* GET all closed orders */
router.get('/history', async (req, res) => {
  res.json(await dbQuery.getClosedOrders())
});

/* GET details of closed order with order ID */
router.get('/history/:id', async (req, res) => {
  const id = req.params.id;
  res.json(await dbQuery.getOrderDetailsById(id))
})

module.exports = router;

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

var express = require("express");
const router = express.Router();
var multer = require("multer");
const { extractWebAnnotations, multerConfig } = require("./helpers.js");
const upload = multer(multerConfig);
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();

/* GET home page. */
router.get("/", (req, res) => {
  res.redirect("/products");
});

router.post('/login', async (req, res) => {
  console.log('POST /login')
  let user = await dbQuery.getUserByEmail(req.body.email).catch(err => {
    console.error(err)
    res.sendStatus(500)
  })

  user = user[0]

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    console.log("Found user")
    const payload = {
      loggedIn: true
    }
    var token = jwt.sign(payload, req.app.get('secret'), {
      expiresIn: 60*60
    })
    res.json({
      success: true,
      message: 'token created',
      token
    })
  } else {
    res.send(400, "Email/Password is incorrect.")
  }

})

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10)
  const user = await dbInsert.addUser(firstName, lastName, email, hashedPassword)
    .catch(err => {
      console.error('Error in inserting new user to database:', err)
    })

  if (user) {
    res.sendStatus(200)
  } else {
    res.send(400, 'Email already exists.')
  }

})


/* GET all products */
router.get("/products", async (req, res) => {
  res.json(await dbQuery.getAllProducts());
});

/* GET results for search query stirng */
router.post("/search", async (req, res) => {
  var userSearchTerm = req.body.product;
  res.json(await dbQuery.searchProductByName(userSearchTerm));
});

/* POST order to server */
router.post("/orders", async (req, res) => {
  // placeholder for order details query, userId should be come from req.body
  // 1 is the placeholder for the userId
  var orderId = await dbInsert.addOrder(1);

  // placeholder for shopping cart items
  // the actual order should come from the client
  var order = [
    { productId: 1, priceInCents: 25, quantity: 1 },
    { productId: 10, priceInCents: 450, quantity: 2 },
    { productId: 20, priceInCents: 123, quantity: 3 }
  ];

  // calculate thte total value of the shopping cart
  var orderTotal = 0;
  order.forEach(line => {
    orderTotal += line.priceInCents * line.quantity;
  });

  // add each line in cart to line_items table
  order.forEach(async line => {
    await dbInsert.addLineItem(
      orderId[0],
      line.productId,
      line.priceInCents,
      line.quantity
    );
  });

  // add total value of order to orders table
  await dbInsert.addOrderTotal(orderId[0], orderTotal);

  res.sendStatus(200);
});

/* POST image to server for google vision api annotations */
router.post("/annotations", upload.single("image"), (req, res) => {
  const imageBuffer = req.file.buffer;
  Promise.all([
    client.webDetection({
      image: {
        content: imageBuffer
      }
    })
  ])
    .then(results => {
      res.json([
        {
          text: "POST /annotations",
          webAnnotations: extractWebAnnotations(results[0])
        }
      ]);
    })
    .catch(err => {
      console.error("Error:", err);
      res.sendStatus(500);
    });
});

module.exports = router;

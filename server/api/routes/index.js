const authRouter = require("./auth");
const usersRouter = require("./users");
const cartRouter = require("./cart");
const itemsRouter = require('./items');
const paymentsRouter = require('./payments');

module.exports = {
  authRouter,
  usersRouter,
  cartRouter,
  itemsRouter,
  paymentsRouter,
};

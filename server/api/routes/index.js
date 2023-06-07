const authRouter = require('./auth');
const usersRouter = require('./users');
const itemsRouter = require('./items');
const paymentsRouter = require('./payments');
const orderRouter = require('./orders');

module.exports = {
  authRouter,
  usersRouter,
  itemsRouter,
  paymentsRouter,
  orderRouter,
};

const authRouter = require('./auth');
const usersRouter = require('./users');
const cartRouter = require('./cart');
const itemsRouter = require('./items');
const paymentsRouter = require('./payments');
const orderRouter = require('./orders');

module.exports = {
	authRouter,
	usersRouter,
	cartRouter,
	itemsRouter,
	paymentsRouter,
	orderRouter,
};

const {
	authRouter,
	usersRouter,
	cartRouter,
	itemsRouter,
	paymentsRouter,
	orderRouter,
} = require('./routes');
const router = require('express').Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/cart', cartRouter);
router.use('/items', itemsRouter);
router.use('/payments', paymentsRouter);
router.use('/orders', orderRouter);

router.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

module.exports = router;

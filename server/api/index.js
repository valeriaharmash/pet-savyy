const {
  authRouter,
  usersRouter,
  itemsRouter,
  paymentsRouter,
  orderRouter,
} = require('./routes');
const router = require('express').Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/items', itemsRouter);
router.use('/payments', paymentsRouter);
router.use('/orders', orderRouter);

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;

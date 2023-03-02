const router = require('express').Router();
const {
  models: { Order },
} = require('../../db');

// add admin??

// GET /api/orders/
router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send('Access denied');
    }
    const orders = await Order.findAll({
      where: { userId: red.user.id },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:orderId
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    if (order.userId !== req.user.id) {
      return res.status(403).send('Access denied');
    }
    res.json(order);
  } catch (e) {
    next(e);
  }
});

// POST /api/orders/
router.post('/', async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send('Access denied');
    }
    const order = await Order.create({
      userId: req.user.id,
    });
    res.status(201).json(order);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

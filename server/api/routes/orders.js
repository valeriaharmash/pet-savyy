const router = require('express').Router();
const {
  models: { Order, Item_Order, Item },
} = require('../../db');
const { requireToken } = require('../middleware/auth');

// GET /api/orders?status=&userId=; Get user orders by filters.
router.get('/', async (req, res, next) => {
  try {
    const { status, userId } = req.query;

    const whereClause = {};
    if (status) {
      whereClause.status = status;
    }
    if (userId) {
      whereClause.userId = userId;
    }

    const orders = await Order.findAll({
      where: whereClause,
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:orderId; Get order.
router.get('/:orderId', async (req, res, next) => {
  try {
    const {
      orderId
    } = req.params;

    const order = await Order.findByPk(orderId, {
      include: Item,
    });

    if (!order) {
      res.status(404).send('order not found');
      return;
    }

    // convert Sequelize order object into JS Object
    const formattedOrder = order.toJSON();

    // format order items to exclude "Item_Order"
    formattedOrder.items = order.items.map(item => {
      const formattedItem = { ...item.dataValues };
      formattedItem.qty = item.Item_Order.qty;
      delete formattedItem['Item_Order'];
      return formattedItem;
    });
    // calculate Order total
    formattedOrder.total = order.getTotal();

    res.json(formattedOrder);
  } catch (e) {
    next(e);
  }
});

// PUT /api/orders/:orderId; Update Order Item quantity.
router.put('/:orderId/items/:itemId', async (req, res, next) => {
  try {
    const { orderId, itemId } = req.params;

    const { qty } = req.body;

    // delete item from order if qty is 0
    if (!qty) {
      await Item_Order.destroy({
        where: {
          orderId: orderId,
          itemId: itemId
        }
      });

    } else {
      // get/create order item from db
      const orderItem = await Item_Order.findOrCreate({
        where: {
          orderId: orderId,
          itemId: itemId
        }
      });

      // update order item quantity
      await orderItem[0].update({
        qty
      });
    }

    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

// POST /api/orders; Create order.
router.post('/', async (req, res, next) => {
  try {
    const { userId } = req.body;
    const order = await Order.create({
      userId: userId,
    });
    res.status(201).json(order);
  } catch (e) {
    next(e);
  }
});

// PUT /api/orders/:orderId; Update order data.
router.put('/:orderId', requireToken, async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const {
      paymentId,
      recipientName,
      shippingAddress,
      status
    } = req.body;

    const updateData = {};
    if (paymentId) {
      updateData.paymentId = paymentId;
    }
    if (shippingAddress) {
      updateData.shippingAddress = shippingAddress;
    }
    if (status) {
      updateData.status = status;
    }
    if (recipientName) {
      updateData.recipientName = recipientName;
    }

    await Order.update(
      updateData,
      {
        where: {
          id: orderId,
        },
      }
    );
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;

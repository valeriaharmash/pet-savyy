const router = require('express').Router();
const Sequelize = require('sequelize');
// const { Item_Order, Order, Item, User } = require("../../db");
const {
  models: { User, Item_Order, Order, Item },
} = require('../../db');

// TODO unused code. Enhance by adding strict filtering.
//GET: /api/cart/orders
router.get('/orders', async (req, res, next) => {
  try {
    const orders = await Item_Order.findAll({
      include: [
        {
          model: Item,
        },
        {
          model: Order,
          include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
          ],
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// PUT: /api/cart/login/:userId
router.put('/login/:userId', async (req, res, next) => {
  try {
    const userOrder = await Item_Order.findAll({
      include: [
        {
          model: Item,
        },
        {
          model: Order,
          include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'address'],
          },
          where: {
            userId: req.params.userId,
            status: 'in progress',
          },
        },
      ],
    });

    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'in progress',
      },
    });

    let inputArr = [];
    let total = 0;
    for (let i = 0; i < req.body.length; i++) {
      inputArr.push({
        qty: req.body[i].qty,
        orderId: order.id,
        itemId: req.body[i].item.id,
      });
      total += req.body[i].qty * req.body[i].item.price;
    }

    await order.update({ total: total });

    if (userOrder.length > 0) {
      userOrder.map((item) => {
        item.destroy();
      });
    }
    await Item_Order.bulkCreate(inputArr, { validate: true });
  } catch (err) {
    next(err);
  }
  res.send();
});

// GET: /api/cart/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const userOrder = await Item_Order.findAll({
      include: [
        {
          model: Item,
        },
        {
          model: Order,
          include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'address'],
          },
          where: {
            userId: req.params.userId,
            status: 'in progress',
          },
        },
      ],
    });
    res.json(userOrder);
  } catch (err) {
    next(err);
  }
});

// update the qty in cart
router.put('/:userId', async (req, res, next) => {
  try {
    const userOrder = await Item_Order.findOne({
      include: [
        {
          model: Item,
          where: {
            id: req.body.itemId,
          },
        },
        {
          model: Order,
          include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'address'],
          },
          where: {
            userId: req.params.userId,
            status: 'in progress',
          },
        },
      ],
    });
    const priorQty = userOrder.previous('qty');
    await userOrder.update({ qty: req.body.qty });
    const changeInQty = userOrder.qty - priorQty;
    const currTotal = changeInQty * userOrder.item.price;
    await userOrder.order.increment('total', { by: currTotal });
    res.status(202).send(userOrder);
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    const userOrder = await Item_Order.findOne({
      include: [
        {
          model: Item,
          where: {
            id: req.body.itemId,
          },
        },
        {
          model: Order,
          include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'address'],
          },
          where: {
            userId: req.params.userId,
            status: 'in progress',
          },
        },
      ],
    });
    await userOrder.order.update({ total: req.body.total });
    res.status(204).send(await userOrder.destroy());
  } catch (err) {
    next(err);
  }
});

// add item to cart /api/cart/:userId/:itemId
router.put('/:userId/:itemId', async (req, res, next) => {
  try {
    const userOrder = await Item_Order.findOne({
      include: [
        {
          model: Item,
          where: {
            id: req.body.itemId,
          },
        },
        {
          model: Order,
          include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'address'],
          },
          where: {
            userId: req.params.userId,
            status: 'in progress',
          },
        },
      ],
    });
    if (userOrder) {
      await userOrder.increment('qty', { by: req.body.qty });
      const currTotal = userOrder.qty * userOrder.item.price;
      await userOrder.order.increment('total', { by: currTotal });
    } else {
      const order = await Order.findOne({
        where: {
          userId: req.params.userId,
          status: 'in progress',
        },
      });
      const item = await Item.findOne({
        where: {
          id: req.body.itemId,
        },
      });
      let cartItem = await order.addItem(item);
      await cartItem[0].update({ qty: req.body.qty });
      const currTotal = req.body.qty * item.price;
      await order.increment('total', { by: currTotal });
    }
    res.status(202).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

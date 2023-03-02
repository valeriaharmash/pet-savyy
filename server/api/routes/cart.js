const router = require("express").Router();
const Sequelize = require("sequelize");
// const { Item_Order, Order, Item, User } = require("../../db");
const {
  models: { User, Item_Order, Order, Item },
} = require("../../db");

//GET: /api/cart/orders
router.get("/orders", async (req, res, next) => {
  try {
    const orders = await Item_Order.findAll({
      include: [
        {
          model: Item,
        },
        {
          model: Order,
          include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
          ],
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET: /api/cart/:userId
router.get("/:userId", async (req, res, next) => {
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
            attributes: ["id", "firstName", "lastName", "address"],
          },
          where: {
            userId: req.params.userId,
            status: "in progress",
          },
        },
      ],
    });
    res.json(userOrder);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
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
            attributes: ["id", "firstName", "lastName", "address"],
          },
          where: {
            userId: req.params.userId,
            status: "in progress",
          },
        },
      ],
    });
    await userOrder.update({ qty: req.body.qty });
    await userOrder.order.update({ total: req.body.total });
    res.status(202).send(userOrder);
  } catch (err) {
    next(err);
  }
});

router.delete("/:userId", async (req, res, next) => {
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
            attributes: ["id", "firstName", "lastName", "address"],
          },
          where: {
            userId: req.params.userId,
            status: "in progress",
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
router.put("/:userId/:itemId", async (req, res, next) => {
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
            attributes: ["id", "firstName", "lastName", "address"],
          },
          where: {
            userId: req.params.userId,
            status: "in progress",
          },
        },
      ],
    });
    if(userOrder){
      await userOrder.increment('qty', { by: req.body.qty });
    }else{
      const order = await Order.findOne({
        where: {
          userId: req.params.userId,
          status: "in progress",
        },
      });
      const item = await Item.findOne({
        where: {
          id: req.body.itemId,
        },
      });
      order.addItem(item);
    }
    res.status(202).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

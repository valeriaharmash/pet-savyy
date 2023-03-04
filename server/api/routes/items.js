const router = require("express").Router();
const {
  models: { Item },
} = require("../../db");
const { requireAdminToken } = require("../middleware");

// GET /api/items/
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll({});
    res.send(items);
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:itemId
router.get("/:itemId", async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findOne({
      where: {
        id: itemId,
      },
    });

    if (item) {
      res.send(item);
      return;
    }
    res.status(404).send("Item doesn't exist.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /api/items/
router.post("/", requireAdminToken, async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;
    const newItem = await Item.create({
      name,
      description,
      price,
      stock,
    });
    res.status(201).json(newItem);
  } catch (e) {
    next(e);
  }
});

// PUT /api/items/:itemId
router.put("/:id", requireAdminToken, async (req, res, next) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;
    const [numUpdated] = await Item.update(
      { name, description, price, stock, imageUrl },
      {
        where: { id: req.params.id },
      }
    );
    if (numUpdated === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// DELETE /api/items/:itemId
router.delete("/:id", requireAdminToken, async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.destroy();
    res.send(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

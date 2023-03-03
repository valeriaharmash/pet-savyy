const router = require('express').Router();
const {
  models: { Item },
} = require('../../db');

// GET /api/items/
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll({});
    res.send(items);
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:itemId
router.get('/:itemId', async (req, res, next) => {
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
router.post('/', async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (e) {
    next(e);
  }
});

// PUT /api/items/:itemId
router.put('/:id', async (req, res, next) => {
  try {
    const [numUpdated] = await Item.update(req.body, {
      where: { id: req.params.id },
    });
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
router.delete('/:id', async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    await item.destroy();
    res.send(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

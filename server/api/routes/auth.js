const router = require('express').Router();
const {
  models: { User },
} = require('../../db');
const { requireToken } = require('../middleware');
const { verifyPassword, generateToken } = require('../../utils');
const { stripe } = require("../../utils");

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).send('Invalid email.');
      return;
    }
    if (!password) {
      res.status(400).send('Invalid password.');
      return;
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await verifyPassword(user.password, password))) {
      res.status(401).send('Incorrect email/password');
      return;
    }

    res.send({ token: generateToken(user.id, user.role) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email) {
      res.status(400).send('Invalid email.');
      return;
    }
    if (!password) {
      res.status(400).send('Invalid password.');
      return;
    }
    if (!firstName) {
      res.status(400).send('Invalid first name.');
      return;
    }
    if (!lastName) {
      res.status(400).send('Invalid last name.');
      return;
    }

    const user = await User.create({ email, password, firstName, lastName });

    if (user.role === "customer") {
      const stripeCustomer = await stripe.customers.create({
        name: `${firstName} ${lastName}`,
        email: email
      });
      await user.update({ stripeId: stripeCustomer.id });
    }

    res.send({ token: generateToken(user.id, user.role) });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', requireToken, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;

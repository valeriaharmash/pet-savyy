const router = require('express').Router();
const { stripe } = require('../../utils');
const { models: { User } } = require("../../db");

router.post('/intent', async (req, res, next) => {
  try {
    let stripeCustomerId;
    const { amount, userId } = req.body;
    if (userId) {
      const user = await User.findByPk(userId);
      stripeCustomerId = user.stripeId;
    }
    const params = {
      currency: 'usd',
      amount: amount,
      automatic_payment_methods: {
        enabled: true,
      }
    };
    if (stripeCustomerId) {
      params.customer = stripeCustomerId;
    }
    const paymentIntent = await stripe.paymentIntents.create(params);
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { status } = req.query;
    let query = [];
    if (status) {
      query.push(`status:'${status}'`);
    }
    const paymentIntents = await stripe.paymentIntents.search({ query: query.join(" AND ") });
    res.send(paymentIntents);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
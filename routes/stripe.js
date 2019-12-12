const express = require('express');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const router = new express.Router();

router.post('/api/stripe', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 499,
    currency: 'usd'
  });
  console.log(paymentIntent);

  res.send('Success');
});

module.exports = router;

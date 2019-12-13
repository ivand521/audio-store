const express = require('express');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const router = new express.Router();

router.get('/api/stripe', async (req, res) => {
  try {
    console.log(1);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 499,
      currency: 'usd'
    });

    console.log(paymentIntent);

    res.send(paymentIntent.client_secret);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;

const express = require('express');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const router = new express.Router();

router.post('/api/stripe', async (req, res) => {
  try {
    const { email, subTotal } = req.body;
    console.log(req.body);

    const amount = subTotal * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      receipt_email: email,
      description: 'Subliminal Audio Store'
    });

    console.log(paymentIntent);

    res.send(paymentIntent.client_secret);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

module.exports = router;

// routes/payment.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

// Use Stripe secret key from environment variables
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment intent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: "Amount and currency are required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

"use strict";

const stripe = require("stripe")(process.env.STRAPI_SECRET);

module.exports = {
  // GET /hello
  createIntent: async ctx => {
    let amount = parseInt(ctx.request.body.total * 100);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    ctx.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
};
const express = require("express");
const app = express();
const secretkey = process.env.SECRET_KEY;
const stripe = require("stripe")(
  "sk_test_51LTIsASCXk8N8fXVnOI8is3Xa3ANPetbXlalYcV32PAMDSV9qwF22Nt2QzYY9tjdzNAfxsPa02ePE3qbd2C2BNjb00JXSztVDM"
);
const path = require("path");
const bodyparser = require("body-parser");
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyparser.urlencoded({ extended: true }));
const DOMAIN = "http://localhost:3000";
app.post("/checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Test Product",
          },
          unit_amount: 10000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${DOMAIN}/success.html`,
    cancel_url: `${DOMAIN}/cancel.html`,
  });
  res.redirect(303, session.url);
});
app.listen(3000, () => {
  console.log("Server connected");
});

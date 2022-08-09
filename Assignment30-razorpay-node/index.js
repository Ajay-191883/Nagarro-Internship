const express = require("express");
const RazorPay = require("razorpay");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
const rpinstance = new RazorPay({
  key_id: "rzp_test_Y5vPeeTYKcZypW",
  key_secret: "lRKDVEHN71JGVuc2tSuX6xjp",
});
app.post("/pushorder", async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;
  console.log({ amount, currency, receipt, notes });
  try {
    let response = await rpinstance.orders.create({
      amount,
      currency,
      receipt,
      notes,
    });
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});
app.listen(3000, () => {
  console.log("started at 3000");
});

const stripe_key =
  "sk_test_51LTIsASCXk8N8fXVnOI8is3Xa3ANPetbXlalYcV32PAMDSV9qwF22Nt2QzYY9tjdzNAfxsPa02ePE3qbd2C2BNjb00JXSztVDM";
const stripe = require("stripe")(stripe_key);

module.exports.createNewCustomer = async (req, res, next) => {
  console.log(req.body);
  try {
    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email,
    });
    res.status(200).send(customer);
  } catch (e) {
    res.send("an error occuured");
  }
};

module.exports.addNewCard = async (req, res, next) => {
  const {
    customer_Id,
    card_Name,
    card_ExpYear,
    card_ExpMonth,
    card_Number,
    card_CVC,
  } = req.body;
  try {
    const cardToken = await stripe.tokens.create({
      card: {
        name: card_Name,
        number: card_Number,
        exp_month: card_ExpMonth,
        exp_year: card_ExpYear,
        cvc: card_CVC,
      },
    });

    const card = await stripe.customers.createSource(customer_Id, {
      source: `${cardToken.id}`,
    });

    return res.status(200).send({ card: card.id });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports.createCharges = async (req, res, next) => {
  try {
    const createCharge = await stripe.charges.create({
      receipt_email: "dummy@gmail.com",
      amount: 100 * 100,
      currency: "inr",
      card: req.body.card_ID,
      customer: req.body.customer_ID,
    });
    res.send(createCharge);
  } catch (e) {
    res.send("an error occured!");
    throw new Error(e);
  }
};

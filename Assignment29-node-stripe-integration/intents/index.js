const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();

var Publishable_Key =
  "pk_test_51LTIsASCXk8N8fXVHh7iPlFu3OdjekMvbswZiqZJZYJHDVDjRJtc8ETRNRL06zM98N1tMJ2ElgCBzh4WIYgrhiBk00XpFjxFVg";
var Secret_Key =
  "sk_test_51LTIsASCXk8N8fXVnOI8is3Xa3ANPetbXlalYcV32PAMDSV9qwF22Nt2QzYY9tjdzNAfxsPa02ePE3qbd2C2BNjb00JXSztVDM";

const stripe = require("stripe")(Secret_Key);

const port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("Home", {
    key: Publishable_Key,
  });
});

app.post("/payment", function (req, res) {
  // Moreover you can take more details from user
  // like Address, Name, etc from form
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "Ajay Kumar",
      address: {
        line1: "Pinjore",
        postal_code: "134102",
        city: "Panchkula",
        state: "Haryana",
        country: "India",
      },
    })
    .then((customer) => {
      return stripe.paymentIntents.create({
        amount: 2000,
        description: "Ajay's Product",
        currency: "INR",
        payment_method_types: ["card"],
      });
    })
    .then((data) => {
      console.log(data);
      res.send(
        "<div style='height: 90vh; display: flex; justify-content: center; align-items: center; background-color: black'><h1 style='color: #12AD2B'>Payment is Successful</h1></div> "
      ); // If no error occurs
    })
    .catch((err) => {
      console.log(err);
      res.send(err); // If some error occurs
    });
});

app.listen(port, function (error) {
  if (error) throw error;
  console.log("Server created Successfully");
});

var express = require("express");
var router = express.Router();
const STRIPEHANDLER = require("../controller/stripehandler");

router.post("/create-Customer", STRIPEHANDLER.createNewCustomer);
router.post("/add-Card", STRIPEHANDLER.addNewCard);
router.post("/create-Charges", STRIPEHANDLER.createCharges);

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/groceryDB";
const Grocery = require("./grocery.model");
const port = 3000;

const app = express();

app.use(express.json());

mongoose.connect(dbUrl);
const con = mongoose.connection;

con.on("open", () => {
  console.log("DB connected...");
});

app.get("/all-grocery", async (req, res) => {
  try {
    const allGrocery = await Grocery.find();
    res.json(allGrocery);
  } catch (err) {
    res.send(err);
  }
});

app.post("/add-grocery", async (req, res) => {
  const grocery = new Grocery({
    name: req.body.name,
    price: req.body.price,
    inStock: req.body.inStock,
    discount: req.body.discount,
    stock: req.body.stock,
  });
  try {
    const newGrocery = await grocery.save();
    res.json(newGrocery);
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log("app started");
});

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/quotesDB", {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

const Schema = mongoose.Schema;
const quoteSchema = new Schema({
  name: String,
  quote: String,
});
const Model = mongoose.model;
const Quote = Model("Quote", quoteSchema);

app.get("/", (req, res) => {
  Quote.find((err, document) => {
    res.render("index.ejs", { quotes: document });
  });
});

app.post("/newQuote", (req, res) => {
  const newQuote = new Quote({ name: req.body.name, quote: req.body.quote });
  newQuote.save((err, result) => {
    if (err) console.log(err);
    console.log("post");
  });
  res.send("New Quote Added Successfully");
});

app.put("/updateQuote", (req, res) => {
  Quote.findByIdAndUpdate(
    { _id: req.body.id },
    { name: req.body.name, quote: req.body.quote },
    function (err, result) {
      if (err) res.send(err);
      console.log("put");
    }
  );
  res.send("Quote Updated Successfully");
});

app.delete("/deleteQuote", (req, res) => {
  Quote.deleteOne({ _id: req.body.id }, (err, result) => {
    if (err) res.send(err);

    console.log("delete");
    res.send("Deleted Successfully");
  });
});

app.listen(3000, function () {
  console.log("listening on 3000");
});

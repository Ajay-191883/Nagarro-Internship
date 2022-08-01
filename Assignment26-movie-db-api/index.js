const express = require("express");

const mongoose = require("mongoose");
const Movie = require("./movie.model");
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/moviedb");
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected...");
});

app.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.send("Error " + err);
  }
});

app.post("/", async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    rating: req.body.rating,
    actor: req.body.actor,
  });

  try {
    const a1 = await movie.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

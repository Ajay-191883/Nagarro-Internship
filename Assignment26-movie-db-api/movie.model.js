const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
  actor: { type: String, required: true },
});

module.exports = mongoose.model("Movie", movieSchema);

const express = require("express");
var indexrouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use("/", indexrouter);

app.listen(3000, () => {
  console.log("Server connected at 3000");
});

module.exports = app;

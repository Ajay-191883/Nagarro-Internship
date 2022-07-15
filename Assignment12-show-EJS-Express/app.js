let express = require("express");
let app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// index page
app.get("/", function (req, res) {
  let name = "Ajay Kumar";
  res.render("pages/index", {
    name: name,
  });
});

// about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});

app.listen(8080);
console.log("Server is listening on port 8080");

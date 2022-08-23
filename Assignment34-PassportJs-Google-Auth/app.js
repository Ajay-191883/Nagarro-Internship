const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

const passport = require("passport");

require("./passportConfig")(passport);

const db = require("./db");

db.connect();

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect("/profile/");
  }
);

app.get("/profile", (req, res) => {
  console.log(req);
  res.send("Welcome");
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

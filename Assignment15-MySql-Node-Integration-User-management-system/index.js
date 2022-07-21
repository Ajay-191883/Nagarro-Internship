const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const app = express();

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("assets"));

app.set("view engine", "ejs");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const port = process.env.PORT;

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/loginPage", function (req, res) {
  res.render("loginPage", {
    messages: "",
  });
});
app.get("/registerPage", function (req, res) {
  res.render("registerPage", {
    messages: "",
  });
});

//Register User
app.post("/register", async (req, res) => {
  const user = req.body.name;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM users WHERE user = ?";
    const searchQuery = mysql.format(sqlSearch, [user]);

    const sqlInsert = "INSERT INTO users VALUES (0, ?, ?)";
    const insertQuery = mysql.format(sqlInsert, [user, hashedPassword]);

    await connection.query(searchQuery, async (err, result) => {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);
      connection.release();

      if (result.length != 0) {
        res.render("registerPage", {
          messages: "User already exists",
        });
        console.log("------> User already exists");
      } else {
        await connection.query(insertQuery, (err, result) => {
          if (err) throw err;
          res.render("homePage", {
            user: user,
          });
          console.log("------> Created new User");
          console.log(result.insertId);
        });
      }
    });
  });
});

//Login User
app.post("/login", (req, res) => {
  const user = req.body.name;
  const password = req.body.password;
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * from users where user = ?";
    const searchQuery = mysql.format(sqlSearch, [user]);

    await connection.query(searchQuery, async (err, result) => {
      connection.release();

      if (err) throw err;

      if (result.length == 0) {
        console.log("------> User does not exist");
        res.render("loginPage", {
          messages: "User does not exist",
        });
      } else {
        const hashedPassword = result[0].password;
        bcrypt.compare(password, hashedPassword, function (err, result) {
          if (result) {
            console.log("------> Login Successful");
            res.render("homePage", {
              user: user,
            });
            // res.send(`${user} is logged in!`);
          } else {
            console.log("------> Password Incorrect");
            res.render("loginPage", {
              messages: "Password Incorrect",
            });
            // res.send("Password incorrect!");
          }
        });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

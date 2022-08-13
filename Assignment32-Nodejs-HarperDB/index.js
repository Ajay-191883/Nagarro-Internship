const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
require("dotenv").config();

const routesController = require("./api/index");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route("/movie").post(routesController.addMovie);
app.route("/actor").post(routesController.getByActor);
app.route("/delete").post(routesController.deleteMovie);

app.get("/", (req, res) => res.json("Hello World!"));
app.listen(port, () => console.log(`⚡️ Server listening on port ${port}!`));

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const dbUrl = "mongodb://localhost:27017/oAuth-user";

const connect = async () => {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", () => {
    console.log("could not connect");
  });

  db.once("open", () => {
    console.log("DB Connected");
  });
};

module.exports = { connect };

const db = require("../config/dbconfig");

exports.addMovie = (request, response) => {
  db.insert(
    {
      table: "movie",
      records: [
        {
          name: request.body.name,
          actor: request.body.actor,
        },
      ],
    },
    (err, res) => {
      if (err) response.status(500).json(err);

      response.status(res.statusCode).json(res.data);
    }
  );
};

exports.getByActor = (request, response) => {
  db.searchByValue(
    {
      table: "movie",
      searchAttribute: "actor",
      searchValue: request.body.actor,
      attributes: ["*"],
    },
    (err, res) => {
      if (err) response.status(500).json(err);

      console.log(res);

      response.status(res.statusCode).json(res.data);
    }
  );
};

exports.deleteMovie = (request, response) => {
  db.delete(
    {
      table: "movie",
      hashValues: [request.body.id],
    },
    (err, res) => {
      if (err) response.status(500).json(err);

      response.status(res.statusCode).json(res);
    }
  );
};

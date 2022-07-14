const http = require("http");
const fs = require("fs");
const superheroes = require("superheroes");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    let htmlData = fs.readFileSync("./index.html", "utf-8");
    res.write(String(htmlData));
    res.end();
  })
  .listen(8080);

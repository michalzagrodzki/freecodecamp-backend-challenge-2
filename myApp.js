const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const method = req.method;
  const path = req.path;
  const ip = req.ip;
  console.log(`${method} ${path} - ${ip}`);
  next();
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  const response =
    process.env["MESSAGE_STYLE"] === "uppercase" ? "HELLO JSON" : "Hello json";
  res.json({ message: response });
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  const responseParameter = req.params.word;
  res.json({ echo: responseParameter });
});

app.route("/name").get((req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  const responseQuery = `${firstName} ${lastName}`;
  res.json({ name: responseQuery });
});

module.exports = app;

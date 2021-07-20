const express = require("express");
const app = express();

app.use("/public", express.static(__dirname + "/public"));

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

module.exports = app;

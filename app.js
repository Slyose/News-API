const express = require("express");
const app = express();

const { getTopics } = require("./controllers/controllers.js");

app.get("/api/topics", getTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Invalid endpoint." });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server Error!");
});

module.exports = app;

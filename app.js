const express = require("express");
const app = express();

const { getTopics, getArticleByID } = require("./controllers/controllers.js");

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleByID);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Invalid endpoint." });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  }
  console.log(err);
  res.status(500).send("Server Error!");
});

module.exports = app;

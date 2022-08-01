const express = require("express");
const app = express();

const { getTopics } = require("./controllers/controllers.js");

app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;

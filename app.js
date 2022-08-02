const express = require("express");
const app = express();
const {
  handleCustomError,
  handleServerError,
} = require("./error_handling/error_handling.js");

const {
  getTopics,
  getArticleByID,
  patchArticleByID,
} = require("./controllers/controllers.js");

app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleByID);
app.patch("/api/articles/:article_id", patchArticleByID);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Invalid endpoint." });
});

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;

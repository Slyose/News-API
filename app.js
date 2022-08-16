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
  getUsers,
  getCommentsByArticleID,
  getArticles,
  postCommentsByArticleID,
  deleteCommentsByID,
  getAllApi,
} = require("./controllers/controllers.js");

app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleByID);
app.patch("/api/articles/:article_id", patchArticleByID);
app.get("/api/users", getUsers);
app.get("/api/articles/:article_id/comments", getCommentsByArticleID);
app.get("/api/articles", getArticles);
app.post("/api/articles/:article_id/comments", postCommentsByArticleID);
app.delete("/api/comments/:comment_id", deleteCommentsByID);
app.get("/api", getAllApi);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Invalid endpoint." });
});

app.use(handleCustomError);

app.use(handleServerError);

module.exports = app;

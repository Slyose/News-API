const {
  fetchTopics,
  fetchArticleByID,
  updateArticleByID,
  fetchUsers,
  fetchCommentsByID,
  fetchArticles,
  insertCommentsByArticleID,
} = require("../models/models.js");

exports.getTopics = (req, res) => {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.getArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByID(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleByID = (req, res, next) => {
  updateArticleByID(req.params.article_id, req.body.inc_votes)
    .then((article) => {
      res.status(200);
      res.send(article);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200);
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  fetchArticles()
    .then((articles) => {
      res.status(200);
      res.send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleID = (req, res, next) => {
  fetchCommentsByID(req.params.article_id)
    .then((comments) => {
      res.send(comments);
      res.status(200);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentsByArticleID = (req, res, next) => {
  insertCommentsByArticleID(
    req.body.username,
    req.body.body,
    req.params.article_id
  )
    .then((comment) => {
      res.status(201);
      res.send(comment);
    })
    .catch((err) => {
      next(err);
    });
};

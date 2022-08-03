const {
  fetchTopics,
  fetchArticleByID,
  updateArticleByID,
  fetchUsers,
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
      res.send(article);
      res.status(200);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.send(users);
      res.status(200);
    })
    .catch((err) => {
      next(err);
    });
};

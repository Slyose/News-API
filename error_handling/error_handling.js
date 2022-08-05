exports.handleCustomError = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
};

exports.handleServerError = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  }
  if (err.code === "23503" && err.constraint === "comments_article_id_fkey") {
    res.status(404).send({ msg: "Not found" });
  }
  if (err.code === "23503") {
    res.status(400).send({ msg: "Bad request" });
  }
  if (err.code === "42703" || err.code === "42601") {
    res.status(400).send({ msg: "Bad request" });
  }
  if (err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else res.status(500).send("Server Error!");
};

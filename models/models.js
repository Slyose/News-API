const db = require("../db/connection");
const { checkExists } = require("../utilities/utils.js");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics;`).then(({ rows: topics }) => {
    return topics;
  });
};

exports.fetchArticleByID = (id) => {
  return db
    .query(
      `SELECT articles.*,
    COUNT(comments.article_id)::INTEGER AS comment_count FROM comments
    LEFT JOIN articles
    ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "article_id does not exist",
        });
      }
      return rows[0];
    });
};

exports.fetchArticles = () => {
  return db
    .query(
      `SELECT articles.article_id,articles.title,articles.topic,articles.author,articles.created_at,articles.votes,
      COUNT(comments.article_id)::INTEGER AS comment_count FROM comments
      RIGHT JOIN articles
      ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY created_at DESC;`
    )
    .then(({ rows: articles }) => {
      return articles;
    });
};

exports.updateArticleByID = (id, votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [votes, id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article not found",
        });
      }
      return rows[0];
    });
};

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users;`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchCommentsByID = (id) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1`,
      [id]
    )
    .then(async ({ rows }) => {
      if (!rows.length) {
        await checkExists("articles", "article_id", id);
      }
      return rows;
    });
};

const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

const idealOutputGetTopics = [
  { slug: "mitch", description: "The man, the Mitch, the legend" },
  { slug: "cats", description: "Not dogs" },
  { slug: "paper", description: "what books are made of" },
];

describe("Error handling for invalid endpoint", () => {
  test("status:404, responds with an error message when passed an non-existant endpoint", () => {
    return request(app)
      .get("/api/iDontExist")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid endpoint.");
      });
  });
});

describe("GET /api/topics", () => {
  test("should respond with an array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(Array.isArray(data.topics)).toBe(true);
      });
  });
  test("should respond with an array of length 3", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.topics.length).toBe(3);
      });
  });
  test("should respond with an array of objects, with a key of slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const data = response.body;
        expect(data.topics).toEqual(idealOutputGetTopics);
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("Should be able to return an object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const articles = response.body;
        expect(typeof articles).toBe("object");
      });
  });
  test("Should be able to return an object with appropriate keys", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        let article = body.article;
        expect(article.article_id).toBe(1);
        expect(article.title).toEqual(expect.any(String));
        expect(article.topic).toEqual(expect.any(String));
        expect(article.author).toEqual(expect.any(String));
        expect(article.body).toEqual(expect.any(String));
        expect(article.created_at).toEqual(expect.any(String));
        expect(article.votes).toEqual(expect.any(Number));
      });
  });
  test("Should return a 404 and 'article_id does not exist' when given an invalid article_ID", () => {
    return request(app)
      .get("/api/articles/9001")
      .expect(404)
      .then(({ _body }) => {
        expect(_body.msg).toBe("article_id does not exist");
      });
  });
  test('should return an error 400 and msg "Bad request"', () => {
    return request(app)
      .get("/api/articles/imNotAnID")
      .expect(400)
      .then(({ _body }) => {
        expect(_body.msg).toBe("Bad request");
      });
  });
});

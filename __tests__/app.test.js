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
        expect(data.topics).toMatchObject(idealOutputGetTopics);
      });
  });
});

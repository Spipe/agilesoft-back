const supertest = require("supertest");
const dotenv = require("dotenv");
dotenv.config();
const sql = require("../models/db");
const { app, server } = require("../../index");

const api = supertest(app);

test("create task unauthorized", async () => {
  await api
    .post("/api/create/task")
    .expect(401)
    .expect("Content-Type", /application\/json/);
});
test("Get all tasks for user unauthorized", async () => {
  await api
    .get("/api/get/tasks")
    .expect(401)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  sql.destroy();
  server.close();
});

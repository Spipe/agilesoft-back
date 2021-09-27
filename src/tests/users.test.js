const supertest = require("supertest");
const dotenv = require("dotenv");
dotenv.config();
const sql = require("../models/db");
const { app, server } = require("../../index");
const { json } = require("express");

const api = supertest(app);

let token;
beforeAll((done) => {
  api
    .post("/api/login")
    .send({
      username: "TEST",
      password: "TEST",
    })
    .end((err, response) => {
      if (err) done();
      token = response.body.token;
      done();
    });
});

describe("USERS", () => {
  test("Create", async () => {
    const userData = {
      username: "TEST" + Math.random(),
      password: "TEST" + Math.random(),
      nombre: "TEST" + Math.random(),
    };
    await api
      .post("/api/create/user")
      .send(userData)
      .expect(200)
      .expect(json)
      .expect("Content-Type", /application\/json/);
  });
  test("Create without data", async () => {
    const userData = {};
    await api
      .post("/api/create/user")
      .send(userData)
      .expect(400)
      .expect(json)
      .expect("Content-Type", /application\/json/);
  });
  test("Login", async () => {
    const userData = {
      username: "TEST",
      password: "TEST",
    };
    await api
      .post("/api/login")
      .send(userData)
      .expect(200)
      .expect(json)
      .expect("Content-Type", /application\/json/);
  });
  test("Login without data", async () => {
    const userData = {};
    await api
      .post("/api/login")
      .send(userData)
      .expect(400)
      .expect(json)
      .expect("Content-Type", /application\/json/);
  });

  test("Get data", async () => {
    await api

      .get("/api/get/user")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
  test("Get data unauthorized", async () => {
    await api
      .get("/api/get/user")
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(() => {
  sql.destroy();
  server.close();
});

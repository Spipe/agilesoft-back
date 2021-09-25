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
console.log(token);
test("Get user data unauthorized", async () => {
  await api
    .get("/api/get/user")
    .expect(401)
    .expect("Content-Type", /application\/json/);
});
test("Create User", async () => {
  const userData = {
    username: "TEST" + Math.random(),
    password: "TEST" + Math.random(),
    nombre: "TESTV1" + Math.random(),
  };
  await api
    .post("/api/create/user")
    .send(userData)
    .expect(200)
    .expect(json)
    .expect("Content-Type", /application\/json/);
});
test("Login user", async () => {
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
test("Get user data", async () => {
  await api

    .get("/api/get/user")
    .set("Authorization", `Bearer ${token}`)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

afterAll(() => {
  sql.destroy();
  server.close();
});

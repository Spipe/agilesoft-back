const supertest = require("supertest");
const dotenv = require("dotenv");
dotenv.config();
const sql = require("../models/db");
const { app, server } = require("../../index");

const api = supertest(app);
let token;
let taskId;

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

describe("TASKS", () => {
  test("Get data for user authorized not found", async () => {
    await api
      .get("/api/get/tasks")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(404);
      });
  });
  test("Create", async () => {
    const taskData = {
      nombre: "TEST",
      descripcion: "TEST",
    };
    await api
      .post("/api/create/task")
      .send(taskData)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        taskId = res.body.id;
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
      });
  });
  test("Create without data", async () => {
    const taskData = {};
    await api
      .post("/api/create/task")
      .send(taskData)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.type).toBe("application/json");
      });
  });
  test("Create unauthorized", async () => {
    const taskData = {
      nombre: "TEST",
      descripcion: "TEST",
    };
    await api
      .post("/api/create/task")
      .send(taskData)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
  test("Update", async () => {
    await api
      .put(`/api/update/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
      });
  });
  test("Update unauthorized", async () => {
    await api
      .put(`/api/update/task/${taskId}`)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
  test("Update not found", async () => {
    await api
      .put(`/api/update/task/0`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.type).toBe("application/json");
      });
  });
  test("Get data", async () => {
    await api
      .get("/api/get/tasks")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
      });
  });
  test("Get data for user unauthorized", async () => {
    await api
      .get("/api/get/tasks")
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
  test("Delete", async () => {
    await api
      .delete(`/api/delete/task/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
      });
  });

  test("Delete unauthorized", async () => {
    await api
      .delete("/api/delete/task/5")
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
  test("Delete not found", async () => {
    await api
      .delete("/api/delete/task/0")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.type).toBe("application/json");
      });
  });
});

afterAll(() => {
  sql.destroy();
  server.close();
});

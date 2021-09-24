module.exports = (app) => {
  const users = require("../controllers/users.controllers");
  app.post("/api/create/user", users.create);
  app.post("/api/login", users.login);
  app.get("/api/get/user", users.userData);
};

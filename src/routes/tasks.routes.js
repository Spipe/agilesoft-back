module.exports = (app) => {
  const tasks = require("../controllers/tasks.controllers");
  app.post("/api/create/task", tasks.create);
  app.delete("/api/delete/task/:taskId", tasks.delete);
  app.get("/api/get/tasks", tasks.findAllByUser);
  app.put("/api/update/task/:taskId", tasks.updateStateById);
};

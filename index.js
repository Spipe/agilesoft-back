const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

require("./src/routes/users.routes")(app);
require("./src/routes/tasks.routes")(app);

const server = app.listen(3000, () => {
  console.log(`Server on port 3000`);
});
console.log("Pruebas de test")
module.exports = { app, server };

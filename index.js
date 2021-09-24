const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

require("./src/routes/users.routes")(app);

app.listen(3000, () => {
  console.log(`Server on port 3000`);
});

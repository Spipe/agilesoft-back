const sql = require("./db.js");
const bcrypt = require("bcryptjs");

const Users = function (Users) {
  this.username = Users.username;
  this.password = Users.password;
  this.nombre = Users.nombre;
};

Users.create = (newUsers, result) => {
  sql.query("INSERT INTO usuarios SET ?", newUsers, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("user created: ", { id: res.insertId, ...Users });
    result(null, { id: res.insertId, ...Users });
  });
};

Users.findOne = (username, result) => {
  sql.query(
    `SELECT * FROM USUARIOS WHERE username="${username}";`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result(
        {
          kind: "not_found",
        },
        null
      );
    }
  );
};

Users.findOneById = (id, result) => {
  sql.query(
    `SELECT username,nombre FROM USUARIOS WHERE id=${id};`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("User found :", res[0]);
        result(null, res[0]);
        return;
      }
      result(
        {
          kind: "not_found",
        },
        null
      );
    }
  );
};

Users.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

module.exports = Users;

const Users = require("../models/users.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no debe estar vacio",
    });
  }
  const users = new Users({
    username: req.body.username,
    password: req.body.password,
    nombre: req.body.nombre,
  });
  users.password = await Users.encryptPassword(users.password);
  const token = jwt.sign({ id: users._id }, process.env.SECRET_TOKEN, {
    expiresIn: 60 * 60 * 24,
  });
  Users.create(users, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else res.send({ auth: true, token: token, nombre: users.nombre });
  });
};

exports.login = (req, res) => {
  Users.findOne(req.body.username, async (err, data) => {
    const passwordCorrect =
      data == null
        ? false
        : await bcrypt.compare(req.body.password, data.password);

    if (!passwordCorrect || err) {
      res.status(401).send({
        error: "invalid user or password",
      });
    } else {
      const token = jwt.sign({ id: data.id }, process.env.SECRET_TOKEN, {
        expiresIn: 60 * 60 * 24,
      });
      res.send({
        name: data.nombre,
        username: data.username,
        token,
      });
    }
  });
};
exports.userData = (req, res) => {
  const authorization = req.get("authorization");
  let token = null;
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  } else {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    Users.findOneById(decoded.id, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.send(data);
      }
    });
  }
};

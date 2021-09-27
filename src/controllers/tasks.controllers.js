const Tasks = require("../models/tasks.models");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  //Se extraen los headers con la informacion de autorizacion
  const authorization = req.get("authorization");
  if (!req.body.nombre || !req.body.descripcion) {
    res.status(400).send({
      message: "El contenido no debe estar vacio",
    });
    return;
  }
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
    //Si esta la informacion enviada y el token generado se verifica su validez
    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      let date = new Date();
      const tasks = new Tasks({
        id_usuario: decoded.id,
        nombre: req.body.nombre,
        estado: false,
        descripcion: req.body.descripcion,
        fecha_creacion: date,
        fecha_actualizacion: date,
      });
      //Una vez validado se crea la nueva tarea
      Tasks.create(tasks, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.send(data);
      });
    } catch (err) {
      console.log("error :", err);
      res.status(401).json({
        auth: false,
        message: "Wrong token or not provided",
      });
    }
  }
};
exports.delete = async (req, res) => {
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
    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      Tasks.remove(decoded.id, req.params.taskId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Task with id ${req.params.taskId}.`,
            });
          } else {
            res.status(500).send({
              message: "Could not delete Task with id " + req.params.taskId,
            });
          }
        } else res.send({ message: `Task was deleted successfully!` });
      });
    } catch (err) {
      console.log("error: ", err);
      res.status(401).json({
        auth: false,
        message: "Wrong token or not provided",
      });
    }
  }
};
exports.findAllByUser = (req, res) => {
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
    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      Tasks.getAllByUser(decoded.id, (err, data) => {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `User without Tasks`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete Task with id " + req.params.taskId,
          });
        }
      });
    } catch (err) {
      console.log("error: ", err);
      res.status(401).json({
        auth: false,
        message: "Wrong token or not provided",
      });
    }
  }
};

exports.updateStateById = (req, res) => {
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
    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      let date = new Date();
      Tasks.updateState(decoded.id, req.params.taskId, date, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else res.send({ message: data.message });
      });
    } catch (err) {
      console.log("error: ", err);
      res.status(401).json({
        auth: false,
        message: "Wrong token or not provided",
      });
    }
  }
};

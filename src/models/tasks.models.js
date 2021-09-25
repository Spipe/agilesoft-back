const sql = require("./db.js");

const Tasks = function (Tasks) {
  this.id_usuario = Tasks.id_usuario;
  this.nombre = Tasks.nombre;
  this.estado = Tasks.estado;
  this.descripcion = Tasks.descripcion;
  this.fecha_creacion = Tasks.fecha_creacion;
  this.fecha_actualizacion = Tasks.fecha_actualizacion;
};

Tasks.create = (newTasks, result) => {
  sql.query("INSERT INTO tareas SET ?", newTasks, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Task created: ", { id: res.insertId, ...Tasks });
    result(null, { id: res.insertId, ...Tasks });
  });
};
Tasks.remove = (userId, taskId, result) => {
  sql.query(
    `DELETE FROM tareas WHERE  id_usuario=${userId} and id=${taskId};`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted task with id: ", taskId);
      result(null, res);
    }
  );
};
Tasks.getAllByUser = (userId, result) => {
  sql.query(
    `SELECT T.id, T.nombre,T.estado FROM usuarios as U INNER JOIN tareas as T ON  U.id=T.id_usuario WHERE U.id=${userId};`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Tasks found :", res);
        result(null, res);
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

Tasks.updateState = (userId, taskId, dateAct, result) => {
  sql.query(
    `UPDATE tareas SET estado = not estado , fecha_actualizacion=? WHERE id_usuario=${userId} and id=${taskId};`,
    [dateAct],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated task with  id: ", taskId);
      result(null, res);
    }
  );
};
module.exports = Tasks;

const express = require("express");
let TasksController = require("../controllers/tasks");
let routes = express.Router();

routes.route("/tasks").get(TasksController.index).post(TasksController.create);

//routes.route("/tasks").get(function(req, res) {
//	res.send("hola mundo rest");
//}).post(TasksController.create);

routes.get("/tasks/new", TasksController.new);
//actualizar un registro para diferenciar con show le colocamos /edit
routes.get("/tasks/:id/edit", TasksController.edit);
// este orden es importante para que sea visible la ruta
routes.route("/tasks/:id").get(TasksController.show).delete(TasksController.destroy);
//.post();.post(function(req,res){
//
//});

module.exports = routes;
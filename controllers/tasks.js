// cuando se importa una carpeta y busca index.js
const Task = require("../models").Task;
const User = require("../models").User;
//commonjs no es parte de javascript
module.exports = {
	//home: function(req, res){
	//	Task.findAll().then(function(tasks){
	//		res.render("tasks/index", {tareas: tasks});
	//	});
	//},
	index: function(req, res) {
		Task.findAll().then(result => {
			res.render("tasks/index",{tareas:req.user.tasks});
			//res.render("tasks/index",{tareas:result});
			//res.json(result);
		}).catch(err => {
			res.json(err);
		})
	},
	show: function(req, res) {
		Task.findById(req.params.id, {
			include: [ // incluir la relación con User (eager loading) la tarea se asocia a un usuario
				user // esto viene de "as user"
				// esto es otra manera
				//{
				//	model: User
				//}
			]
		}).then(function(task) {
			//res.json(task);
			res.render("tasks/show",{tareas: task});
		})
		//Task.findById(req.params.id).then(function(task) {
		//	//res.json(task);
		//	res.render("tasks/show",{tareas: task});
		//})
	},
	edit: function(req, res) {
		Task.findById(req.params.id).then(function(task) {
			//res.json(task);
			task.addCategories([1,5])
			res.render("tasks/edit",{tarea: task});
		})
	},
	destroy: function(req, res) {
		Task.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(contadorElementos){
			res.redirect("/tasks");
		})
	},
	create: function(req, res) {
		console.log("create task");
		Task.create({
			description: req.body.description,
			userId: req.user.id // esto se agrega para la relación
		}).then(result => {
			console.log(result);
			res.json(result);
		}).catch(err => {
			console.log(err);
			res.json(err);
		})
	},
	new: function(req, res) {
		res.render("tasks/new")
	},
	update: function(req, res) {
		Task.update({description: req.body.description}, {
			where: {
				id: req.params.id
			}
		}).then(function(response){
			res.redirect("/tasks/" + req.params.id);
		})
	}
};
'use strict';
const socket = require("../realtime/client");

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: DataTypes.TEXT
  }, {});

	Task.associate = function(models) {
		// associations can be defined here
		// una tarea le pertenece a un usuario
		Task.belongsTo(models.User, {
			as: "user", // esto para que la asociacion se genere con este nombre user y no haya confusión
			foreignKey: "userId" // esto para postgres
		});
		// muchos a muchos
		Task.belongsToMany(models.Category, {
			through: "TaskCategories",
			as: "categories",
			foreignKey: "categoryId" // esto para postgres
		})
		Task.afterCreate(function(task,options) {
			socket.emit("new_task", task);
		})
 	};
  return Task;
};
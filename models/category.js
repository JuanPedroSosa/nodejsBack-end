'use strict';
const Task = require("../models").Task;

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
	// associations can be defined here
	// muchos a muchos
	Category.belongsToMany(models.Task, {
		through: "TaskCategories",
		as: "tasks",
		foreignKey: "taskId" // esto para postgres
	})
  };
  return Category;
};
'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false
	},
	password_hash: DataTypes.STRING,
	password: DataTypes.VIRTUAL // esto no se guarda en la BD solo usa beforeCreate
  }, {});
  User.associate = function(models) {
	// associations can be defined here
	// un usuario puede tener muchas tareas
	User.hasMany(models.Task, {
		as: "tasks", // esto para que la asociacion se genere con este nombre tasks y no haya confusión
		foreignKey: "userId" // esto para postgres
	});
  };
  // la funcion login es creada por nosotros no es parte de sequelize
  // emacscript 6 permite crear esta función
  // método de clase
  User.login = function(email, password) {
	return User.findOne({
		where: {
			email: email
		}
	}).then(user => {
		if (!user)
			return null;
		return user.authenticatePassword(password).then(valid => {
			if (valid)
				return user;
			return null;
		})
	})
  }
// método de instancia
  User.prototype.authenticatePassword = function(password) {
	return new Promise((res,rej) =>{
		bcrypt.compare(password, this.password_hash, function(err, valid){
			if (err)
				return rej(err);
			res(valid);
		})
	})

  }
  // hook entonces para que sequelize espere lo tenemos que meter a la operación detrn de una promesa
  User.beforeCreate(function(user, options){
	  return new Promise((req, res) => {
		if (user.password) {
			bcrypt.hash("password", 10, function(error, hash){
			  user.password_hash = hash;
			  res(); // terminó y retornamos
			})
		}
	  })

  });
  return User;
};
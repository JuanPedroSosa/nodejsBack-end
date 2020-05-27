const User = require("../models").User;

module.exports = function (req, res, next) {
	if (!req.session.userId)
		return next();
		User.findById(req.session.userId, {
			include: [
				{
					// todas las tareas que le pertenece a un usuario
					association: "tasks" // otra manera de asociar y como es una coleccion le paso asociación
				}
			]
		}).then(user => {
			if (user) {
				req.user = user;
				next();
			}
		})
	//User.findById(req.session.userId).then(user => {
	//	if (user) {
	//		req.user = user;
	//		next();
	//	}
	//})
}
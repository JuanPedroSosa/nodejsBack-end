// si hay usuario que haya iniciado sesión puede continuar, si no lo nnvío a iniciar sesión
module.exports = function (req, res, next) {
	// los middleware son visibles para todas las rutas
	// con este chequeo solo compruebo la sesión para la ruta tasks para todas las demás la dejo pasar
	if (!req.originalUrl.includes("tasks"))
		return next();
	if (req.session.userId)
		return next();
	res.redirect("/sessions");
}
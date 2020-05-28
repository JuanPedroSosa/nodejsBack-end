const express = require("express");
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const methodOverride = require("method-override");
const session = require("express-session");
const socketio = require("socket.io");

const app = express();
const tasksRoutes = require("./routes/tasksroutes");
const registrationsRoutes = require("./routes/registrations_routes");
const sessionsRoutes = require("./routes/sessions_routes");
const categoriesRoutes = require("./routes/categories_routes");

const findUserMiddleware = require("./middlewares/find_user");
const authUser = require("./middlewares/auth_user");
//const tasks = require("./controllers/tasks");

// formato del cuerpo de la petición(body) urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
// las cookies se guardan en el cliente y se encriotan para eso
// necesitamos firmarlas
// cada navegador tiene su almacén de cookie y no se comparten
//app.use(cookieSession({
//	name: "session", // puede tener cualquiera pero se usa este
//	keys: ["dsfsdfdfdg4544frmbmnab", "ersaqsx34ssdlfbp890nbvbl65"]
//
//}));
// motor de vistas
app.set("view engine", "pug")
// guarda por defecto en ram
let sessionCfg = {
	secret: ["345fdggfgddgdf56ggh", "fgg56fg34d22as89"],
	saveUninitialized: false,
	resave: false
}
// modo producción lo guarda en la tabla session
if (process.env.NODE_ENV && process.env.NODE_ENV == "production")
	sessionCfg["store"] = new (require("connect-pg-simple")(session))();

app.use(session());
// tiene que estar después de la session (stack de middlware)
// para poder buscar en la sesión
app.use(findUserMiddleware);
app.use(authUser);

app.use(tasksRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes);
app.use(categoriesRoutes);

//app.get("/tasks", tasks.home);

// use es un middleware y lo agrega al stack de middleware
// carpeta de archivos estaticos se puede llamar public, static, etc
//app.use(express.static("assets"));
// dentro de assets podría haber una carpeta public
// cache: hay varias estrategias una es etag y la otra maxage
// maxage: es un por tiempo y durante ese tiempo la páginas estaticas
// por más que sufran cambio no se actualizaran
// etag: comprueba si tiene en el cache la misma respuesta no hace
// la actualización. Por defecto express usa etag en true
// curl http://localhost:8000/public/style.css
// con este comando se puede la estrategia de caching
app.use("/public", express.static("assets",{
	etag:false,
	maxAge: "5h"
}));

//const sequelize = Sequelize("curso_backend", null, null,{
//	dialect: "sqlite",
//	storage: "./curso_backend"
//});
app.get("/", function(req, res) {
	res.render("home", {user: req.user});
})

//app.listen(8000);
// websocket
let server = app.listen(process.env.PORT || 8000);

let io = socketio(server);
let userCount = 0;
let sockets = {};

io.on("connection", function(socket){
	userCount++;
	let userId = socket.request._query.loggeduser;

	if (userId)
		sockets[userId] = socket;

	io.emit("count_updated", {count: userCount});

	socket.on("new_task", function(data){
		if (data.userId) {
			let userSocket = sockets[data.userId];
			console.log(sockets);

			if (!userSocket)
				return;

			userSocket.emit("new_task", data);
		}

	})

	//socket.on("new_task", function(data){
	//	console.log(data);
	//	io.emit("new_task", data);
	//})

	socket.on("disconnect", function() {

		// sockets {
		// 1: socket
		// 2: socket
		// 5: socket
		//}
		// Object.keys devuleve [1,2,5]
		// socket.id es un propiedad del socket para poder identificarlo
		Object.keys(sockets).forEach(userId => {
			let s = sockets[userId];
			if (s.id == socket.id)
			sockets[userId] = null;
		})
		//userCount--;
		//io.emit("count_updated", {count: userCount});
	})
})


// esto se hace acá todo se tuvo que haber ejecutado
const client = require("./realtime/client");


process.on("SIGINT", function(){
	console.log("cerrando app");
	//db.close();
	process.exit();
});
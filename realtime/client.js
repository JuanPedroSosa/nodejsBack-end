const io = require("socket.io-client");

let host = "http://localhost:8000";
// modo producción lo guarda en la tabla session
if (process.env.NODE_ENV && process.env.NODE_ENV == "production")
	shost = "https://tranquil-mountain-62007.herokuapp.com/";

let socket = io.connect(host, {reconnect: true});

socket.on("connect", function() {
	console.log("\n\nSocket connected\n\n");
})

module.exports = socket;
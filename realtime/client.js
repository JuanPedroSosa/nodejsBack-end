const io = require("socket.io-client");

let socket = io.connect("http://localhost:8000", {reconnect: true});

socket.on("connect", function() {
	console.log("\n\nSocket connected\n\n");
})

module.exports = socket;
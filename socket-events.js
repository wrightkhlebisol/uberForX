const dbOps = require("./db/db-ops");
const mongoose = require("mongoose");

function initialize(server) {
	// Creating a new socket.io by passing the HTTP server object
	const io = require("socket.io")(server);

	io.on("connection", (socket) => { // Listen on the 'connection' event for incoming sockets
		console.log("A user just connected");

		socket.on("join", (data) => { // Listen to any join event from connected users
			socket.join(data.userId); // User joins a unique room/channel that's named after the userId
			console.log(`User joined room: ${data.userId}`);
		});
	})

}

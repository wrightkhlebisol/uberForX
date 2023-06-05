const dbOps = require("./db/db-ops");
const mongoose = require("mongoose");

function initialize(server) {
	// Creating a new socket.io by passing the HTTP server object
	const io = require("socket.io")(server);

	io.on("connection", (socket) => { // Listen on the 'connection' event for incoming sockets
		console.log("A user just connected", socket.id, socket.rooms);

		socket.on("join", (data) => { // Listen to any join event from connected users
			socket.join(data.userId); // User joins a unique room/channel that's named after the userId
			console.log(`${data.userType} joined room: ${data.userId}`);
		});

		socket.on("request-for-help", async (requestDetails) => {
			// Save the request
			const requestTime = new Date(); // Time of request
			const requestId = new mongoose.Types.ObjectId(); // generate unique ID for the request

			const location = { // convert lati and long to [long, lat]
				coordinates: [
					requestDetails?.location.longitude,
					requestDetails?.location.latitude
				],
				address: requestDetails?.location.address
			}

			await dbOps.saveRequest(requestId, requestTime, location, requestDetails.civilianId, "waiting");

			const nearestCops = await dbOps.fetchNearestCops(location.coordinates, 2000);
			requestDetails.requestId = requestId;
			console.log({nearestCops, requestDetails})
			for (let i = 0; i < nearestCops.length; i++){
				console.log("Emiting request help");
				io.sockets.to(nearestCops[i].userId).emit('request-for-help', requestDetails);
			}
		});

		socket.on("request-accepted", async (eventData) => {
			console.log("eventData contains", eventData);
			const requestId = new mongoose.Types.ObjectId(eventData.requestDetails?.requestId);

			await dbOps.updateRequest(requestId, eventData.copDetails.copId, 'engaged');
			
			io.sockets.in(eventData.requestDetails.civilianId).emit("request-accepted", eventData.copDetails);
			console.log("request accepted");
		})
	});
}

module.exports = { initialize };

const {Cop, Request} = require("./model");

function fetchNearestCops(coordinates, maxDistance){
	return Cop.find({
		location: {
			$near: {
				$geometry: {
					type: "Point",
					coordinates
				},
				$maxDistance: maxDistance
			}
		}
	})
	.exec()
	.catch(error => {
		console.log(error);
	});
}

function fetchCopDetails(userId){
	return Cop.find({ userId }, {
			copId: 1,
			displayName: 1,
			phone: 1,
			location: 1
		})
		.exec()
		.catch(err => {
			console.error(err);
		})
}

function saveRequest(requestId, requestTime, location, civilianId, status){
	const request = new Request({
		"_id": requestId,
		requestTime,
		location,
		civilianId,
		status
	});

	return request.save()
		.catch(e => {
			console.log(error);
		});
}

function updateRequest(issueId, copId, status){
	return Request.findOneAndUpdate({
		_id: issueId
	}, {
		status, 
		copId
	})
	.catch(err => {
		console.error(error);
	});
}

module.exports = {fetchNearestCops, fetchCopDetails, saveRequest, updateRequest};

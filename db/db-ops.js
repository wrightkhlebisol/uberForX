const dataModel = require("./model");
const Cop = dataModel.Cop;

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

module.exports = {fetchNearestCops, fetchCopDetails};

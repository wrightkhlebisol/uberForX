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

exports.fetchNearestCops = fetchNearestCops;

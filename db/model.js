const mongoose = require("mongoose");

const copSchema = mongoose.Schema({
	userId: {type: String, unique: true, required: true, trim: true},
	displayName: {type: String, trim: true},
	phone: {type: String},
	email: {type: String, trim: true},
	earnedRatings: {type: Number},
	totalRatings: {type: Number},
	location: {
		type: {
			type: String,
			required: true,
			default: "Point"
		},
		address: {type: String},
		coordinates: [Number]
	}
})

copSchema.index({"location": "2dsphere", userId: 1});

const Cop = mongoose.model("Cop", copSchema);
exports.Cop = Cop;

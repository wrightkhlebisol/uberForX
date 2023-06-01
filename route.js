const express = require("express");
const router = express.Router();
const dbOperations = require("./db/db-ops");

router.get("/cops", async (req, res) => {
	const latitude = Number(req.query.lat);
	const longitude = Number(req.query.lng);
	const nearestCops = await dbOperations.fetchNearestCops([longitude, latitude], 2000);

	res.json({
		cops: nearestCops
	});
});

router.get("/civilian.html", async (req, res) => {
	res.render("civilian.html", {
		userId: req.query.userId
	});
});

router.get("/cop.html", async (req, res) => {
	res.render("cop.html", {
		userId: req.query.userId
	});
});

exports.router = router;

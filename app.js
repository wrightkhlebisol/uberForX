const http = require("http");
const express = require("express");
const consolidate = require("consolidate");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./route");

const app = express();
const DB_CONN_STRING = process.env.DB_CONN_STRING;

app.use(bodyParser.urlencoded({
	extended: true,
}));

app.use(bodyParser.json({
	limit: '5mb'
}));

app.set('views', 'views');
app.use(express.static('./public'));

app.set("view engine", "html");
app.engine("html", consolidate.handlebars);

mongoose.connect(DB_CONN_STRING)
	.then(value => {console.log(value.models)})
	.catch(err => console.error(err));

app.use('/', routes.router);

const server = http.Server(app);
const portNumber = 8000;

server.listen(portNumber, () => {
	console.log(`Server listening at port ${portNumber}`);
});

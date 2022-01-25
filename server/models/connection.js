const { model, Schema } = require("mongoose");

const CONNECTION = model(
	"CONNECTION",
	new Schema({
		socket_id: String,
		name: String,
		room: String,
		ip: String,
		screen: String,
	})
);

module.exports = CONNECTION;

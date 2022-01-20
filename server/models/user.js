const { model, Schema } = require("mongoose");

const USER = new Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

module.exports = model("USER", USER);

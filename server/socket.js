const log = require("log-beautify");
const USER = require("./models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function socket(io, secret) {
	io.on("connection", (socket) => {
		log.info_("SOCKET_CONNECTION", socket.id);

		socket.on("/user/sign_up", async (data) => {
			const { password, ...others } = data;
			const saltRounds = 10;
			const salt = await bcrypt.genSalt(saltRounds);
			const hash = await bcrypt.hash(password, salt);
			const user = new USER({ password: hash, ...others });

			try {
				let saved_user = await user.save();
				socket.emit("/user/sign_up", saved_user);
			} catch (err) {
				socket.emit("error", err);
			}
		});

		socket.on("/user/sign_in", async (data) => {
			const { email, password } = data;
			const user = await USER.findOne({ email });

			if (!user) {
				socket.emit("error", "Incorrect email");
				return;
			}

			let valid = await bcrypt.compare(password, user.password);

			if (!valid) {
				socket.emit("error", "Incorrect password");
				return;
			}

			try {
				const token = await jwt.sign(
					{
						email: user.email,
						first_name: user.first_name,
						last_name: user.last_name,
					},
					secret
				);
				log.info_("TOKEN:", token);
				socket.emit("/user/sign_in", { token: token });
				return;
			} catch (err) {
				socket.emit("error", err);
				log.error(err);
				return;
			}
		});

		socket.on("disconnect", () => {
			log.warn_("SOCKET_DISCONNECT", socket.id);
		});

		socket.on("window-event", (data) => {
			socket.broadcast.emit("window-event", data);
		});

		socket.on("navigate", (data) => {
			socket.broadcast.emit("navigate", data);
		});
	});
}

module.exports = socket;

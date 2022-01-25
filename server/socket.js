const log = require("log-beautify");
const USER = require("./models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./user");
const CONNECTION = require("./models/connection");

function socket(io, secret) {
	io.on("connection", (socket) => {
		socket.broadcast.emit("client-ip");

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

		socket.on("window-event", (data) => {
			socket.broadcast.emit("window-event", data);
		});

		socket.on("navigate", (data) => {
			socket.broadcast.emit("navigate", data);
		});

		// socket.on("client-ip", (data) => {
		// 	let user = { socket: socket.id, ip: data };
		// 	users.push(user);
		// });

		socket.on("update-screenshot", async ({ image }) => {
			const new_picture = await CONNECTION.findOneAndUpdate(
				{ socket_id: socket.id },
				{ screen: image }
			);

			socket.emit("notification", "Success");
			socket.broadcast.to(new_picture.room).emit("screen-update", new_picture);
		});

		// cp

		socket.on("join", async ({ name, room, ip, screen }, callback) => {
			// save new connection to database
			const new_connection = new CONNECTION({
				name,
				room,
				ip,
				socket_id: socket.id,
				screen,
			});
			await new_connection.save();

			// if (error) return callback(error);
			socket.emit("notification", "Success");

			// notify the new user that just joined

			// Inform everyone
			// in the room except the joined user
			socket.broadcast
				.to(new_connection.room)
				.emit("notification", new_connection);

			socket.join(room);
			const room_data = await CONNECTION.find({ room });

			io.to(room).emit("roomData", room_data);
			callback();
		});

		socket.on("watch-someone", async ({ ip }) => {
			let con = await CONNECTION.findOne({ socket_id: socket.id });
			if (con && con.room) {
				// const room_data = await CONNECTION.find({ room: con.room });
				io.to(con.room).emit("watch-teacher", { ip: ip });
			}
		});

		socket.on("disconnect", async () => {
			let con = await CONNECTION.findOneAndRemove({ socket_id: socket.id });
			if (con && con.room) {
				const room_data = await CONNECTION.find({ room: con.room });
				io.to(con.room).emit("roomData", room_data);
			}
		});
	});
}

module.exports = socket;

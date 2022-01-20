const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const log = require("log-beautify");
const { connect } = require("mongoose");
const { config } = require("dotenv");
const socket = require("./socket");

config({ path: "../.env" });
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const {
	MONGO_ADDRESS,
	MONGO_PORT,
	EXPRESS_ADDRESS,
	EXPRESS_PORT,
	MONGO_INITDB_DATABASE,
	MONGO_USER,
	MONGO_PASSWORD,
	SECRET,
} = process.env;

const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_ADDRESS}:${MONGO_PORT}/${MONGO_INITDB_DATABASE}`;

async function main() {
	try {
		await connect(MONGO_URI).then(() => {
			log.success_("DATABASE: Connected");

			server.listen(EXPRESS_PORT, EXPRESS_ADDRESS, () => {
				log.success_(`SERVER: http://${EXPRESS_ADDRESS}:${EXPRESS_PORT}`);
			});
		});
	} catch (e) {
		log.error_("ERROR", e);
	}
}

socket(io, SECRET);
main();

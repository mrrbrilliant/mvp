const express = require("express");
const cors = require("cors");
const { homedir } = require("os")
const path = require("path");
const app = express();
const pub_dir = path.join(homedir(), "Public/screenshots");

app.use(cors("*"));
app.use("/public", express.static(pub_dir));

app.listen("4001", "0.0.0.0", () =>
	console.log("File server: http://localhost:4001")
);

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors("*"));
app.use("/public", express.static(path.join(__dirname, "public")));

app.listen("4001", "0.0.0.0", () =>
	console.log("File server: http://localhost:4001")
);

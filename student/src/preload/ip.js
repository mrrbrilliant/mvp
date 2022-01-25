export const clientIp = Object.values(require("os").networkInterfaces())
	.flat()
	.filter((item) => !item.internal && item.family === "IPv4")
	.find(Boolean).address;

import os from "os";
import { join } from "path";
import { app, BrowserWindow, ipcMain, remote } from "electron";
import "./samples/electron-store";
import screenshot from "screenshot-desktop";
import fs from "fs";
import { v4 as uuid } from "uuid";
// const os = require("os");
import { spawn } from "child_process";

// if (!app.requestSingleInstanceLock()) {
// 	app.quit();
// 	process.exit(0);
// }

let win = null;

async function createWindow() {
	win = new BrowserWindow({
		title: "Main window",
		webPreferences: {
			preload: join(__dirname, "../preload/index.cjs"),
		},
		show: false,
		fullscreen: false,
		resizable: true,
	});
	win.setMenu(null);
	if (app.isPackaged) {
		win.loadFile(join(__dirname, "../renderer/index.html"));
	} else {
		const pkg = await import("../../package.json");
		const url = `http://${pkg.env.HOST || "127.0.0.1"}:${pkg.env.PORT}`;

		win.loadURL(url);
		win.webContents.openDevTools();
	}

	// Test active push message to Renderer-process.
	win.webContents.on("did-finish-load", () => {
		win.show();
		win.webContents.send("main-process-message", new Date().toLocaleString());
	});
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	win = null;
	if (process.platform !== "darwin") {
		app.quit();
		app.exit();
	}
});

app.on("second-instance", () => {
	if (win) {
		// Someone tried to run a second instance, we should focus our window.
		if (win.isMinimized()) win.restore();
		win.focus();
	}
});

app.on("activate", () => {
	const allWindows = BrowserWindow.getAllWindows();
	if (allWindows.length) {
		allWindows[0].focus();
	} else {
		createWindow();
	}
});

app.on("browser-window-blur", (event, win) => {
	if (win.isAlwaysOnTop()) {
		win.focus();
	}
});

ipcMain.on("enter-always-on-top", () => {
	win.setAlwaysOnTop(true);
	win.setSkipTaskbar(true);
	win.setKiosk(true);
	win.setClosable(false);
	win.show();
});

ipcMain.on("leave-always-on-top", () => {
	win.setAlwaysOnTop(false);
	win.setSkipTaskbar(false);
	win.setKiosk(false);
	win.setClosable(true);
	win.hide();
});

ipcMain.on("hide", () => {
	win.hide();
});

ipcMain.on("show", () => {
	win.show();
});

ipcMain.on("screenshot", (event, arg) => {
	const { homedir } = os;
	const pub_dir = join(homedir(), "Public/screenshots");

	fs.stat(pub_dir, function (err, stat) {
		if (err && err.code === "ENOENT") {
			fs.mkdirSync(pub_dir, { recursive: true });
		}
	});

	const name = `${uuid()}.jpg`;
	const target = join(pub_dir, name);
	screenshot()
		.then((img) => {
			fs.writeFile(target, img, function (err) {
				if (err) {
					throw err;
				}
				console.log(`${name} created`);
				event.reply("image_created", name);
			});
		})
		.catch((err) => {
			throw err;
		});
});

ipcMain.on("watch-teacher", (event, arg) => {
	console.log("called");
	spawn("vncviewer", [arg.ip, "-viewonly"], { detach: true });
});

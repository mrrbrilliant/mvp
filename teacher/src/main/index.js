import os from "os";
import { join } from "path";
import { app, BrowserWindow, ipcMain } from "electron";
// const { execFile } = require('child_process');
import { spawn } from "child_process";
import "./samples/electron-store";

if (!app.requestSingleInstanceLock()) {
	app.quit();
	process.exit(0);
}

let win = null;

async function createWindow() {
	win = new BrowserWindow({
		title: "Main window",
		webPreferences: {
			preload: join(__dirname, "../preload/index.cjs"),
		},
		show: false,
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

ipcMain.on("remote-control", (event, arg) => {
	spawn("vncviewer", [arg], { detached: true });
});

ipcMain.on("remote-view", (event, arg) => {
	spawn("vncviewer", [arg, "-viewonly"], { detached: true });
});

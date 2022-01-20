import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./samples/electron-store";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth_context";
import { SocketProvider } from "./context/socket_context";
ReactDOM.render(
	<SocketProvider>
		<AuthProvider>
			<BrowserRouter>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</BrowserRouter>
		</AuthProvider>
	</SocketProvider>,
	document.getElementById("root"),
	() => {
		setTimeout(() => window.bridge.removeLoading(), 100);
	}
);

// -----------------------------------------------------------

console.log("contextBridge ->", window.bridge);

// Use ipcRenderer.on
window.bridge.ipcRenderer.on("main-process-message", (_event, ...args) => {
	console.log("[Receive Main-process message]:", ...args);
});

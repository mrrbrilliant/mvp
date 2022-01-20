import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { SocketContext } from "./context/socket_context";

// Pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Home from "./pages/Home";
import Protected from "./pages/Protected";

function App() {
	const socket = useContext(SocketContext);

	function greet() {
		window.bridge.ipcRenderer.send("asynchronous-message", "ping");
	}

	function enter() {
		window.bridge.ipcRenderer.send("enter-fullscreen", "ping");
	}
	function leave() {
		window.bridge.ipcRenderer.send("leave-fullscreen", "ping");
	}

	function ontop() {
		window.bridge.ipcRenderer.send("enter-always-on-top", "ping");
	}
	function normal() {
		window.bridge.ipcRenderer.send("leave-always-on-top", "ping");
	}
	useEffect(() => {
		socket.on("connect", () => {
			console.log("Connected");
		});
	}, [socket]);

	useEffect(() => {
		socket.on("error", (data) => {
			console.error(JSON.stringify(data));
		});
	}, [socket]);

	useEffect(() => {
		socket.on("window-event", (data) => {
			// window.bridge.ipcRenderer.on("asynchronous-reply", (event, arg) => {
			// 	console.log(arg); // prints "pong"
			// });
			window.bridge.ipcRenderer.send(data);
		});
	});

	return (
		<div>
			<Routes>
				<Route path="/" element={<Protected />}>
					<Route index element={<Home />} />
				</Route>
				<Route path="/sign_in" element={<SignIn />} />
				<Route path="/sign_up" element={<SignUp />} />
			</Routes>
			<button className="p-2 bg-blue-200 mr-2" onClick={greet}>
				Say Hi
			</button>
			<button className="p-2 bg-blue-200 mr-2" onClick={() => enter()}>
				Enter
			</button>
			<button className="p-2 bg-blue-200 mr-2" onClick={() => leave()}>
				Leave
			</button>
			<button className="p-2 bg-blue-200 mr-2" onClick={() => ontop()}>
				ontop
			</button>
			<button className="p-2 bg-blue-200 mr-2" onClick={() => normal()}>
				normal
			</button>
		</div>
	);
}

export default App;

import { useEffect, useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SocketContext } from "./context/socket_context";

// Pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignOut from "./pages/SignOut";

import Home from "./pages/Home";
import Protected from "./pages/Protected";
import NotFound from "./pages/NotFound";
import Attention from "./pages/Attention";
function App() {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const socket = useContext(SocketContext);
	const ip = window.bridge.ip;

	useEffect(() => {
		socket.on("connect", () => {
			console.log("connect");
		});
	}, [socket]);

	useEffect(() => {
		socket.on("error", (data) => {
			console.error(JSON.stringify(data));
		});
	}, [socket]);

	useEffect(() => {
		socket.on("window-event", (data) => {
			window.bridge.ipcRenderer.send(data);
		});
	}, [socket]);

	return (
		<div>
			<Routes>
				<Route path="/" element={<Protected />}>
					<Route index element={<Home />} />
					<Route path="/attention" element={<Attention />} />
				</Route>
				<Route path="/sign_in" element={<SignIn />} />
				<Route path="/sign_out" element={<SignOut />} />
				<Route path="/sign_up" element={<SignUp />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;

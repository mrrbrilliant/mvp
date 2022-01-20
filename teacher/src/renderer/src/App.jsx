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

	return (
		<div>
			<Routes>
				<Route path="/" element={<Protected />}>
					<Route index element={<Home />} />
				</Route>
				<Route path="/sign_in" element={<SignIn />} />
				<Route path="/sign_up" element={<SignUp />} />
			</Routes>
			<button onClick={() => socket.emit("window-event", "enter-fullscreen")}>
				Enter
			</button>
			<button onClick={() => socket.emit("window-event", "leave-fullscreen")}>
				Enter
			</button>
			<button
				onClick={() => socket.emit("window-event", "enter-always-on-top")}
			>
				OT
			</button>
			<button
				onClick={() => socket.emit("window-event", "leave-always-on-top")}
			>
				NOT
			</button>
		</div>
	);
}

export default App;

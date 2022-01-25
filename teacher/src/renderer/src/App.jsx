import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { SocketContext } from "./context/socket_context";

// Pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignOut from "./pages/SignOut";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Protected from "./pages/Protected";

function App() {
	const socket = useContext(SocketContext);

	useEffect(() => {
		socket.on("client-ip", () => {
			socket.emit("users");
		});
	}, [socket]);

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
				<Route path="/sign_out" element={<SignOut />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			{/* <h1>NAVIGATE</h1>
			<ul className="flex gap-4">
				<li
					className="p-4 rounded-lg bg-blue-400"
					onClick={() => socket.emit("navigate", "404")}
				>
					404
				</li>
				<li
					className="p-4 rounded-lg bg-blue-400"
					onClick={() => socket.emit("navigate", "/")}
				>
					HOME
				</li>
				<li
					className="p-4 rounded-lg bg-blue-400"
					onClick={() => socket.emit("navigate", "/sign_in")}
				>
					SIGN IN
				</li>
				<li
					className="p-4 rounded-lg bg-blue-400"
					onClick={() => socket.emit("navigate", "/sign_up")}
				>
					SIGN UP
				</li>
				<li
					className="p-4 rounded-lg bg-blue-400"
					onClick={() => socket.emit("navigate", "/sign_out")}
				>
					SIGN OUT
				</li>
				<li
					className="p-4 rounded-lg bg-blue-400"
					onClick={() => socket.emit("navigate", "/attention")}
				>
					FOCUS
				</li>
			</ul> */}
		</div>
	);
}

export default App;

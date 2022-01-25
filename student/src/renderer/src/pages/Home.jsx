import React, { useEffect, useContext } from "react";
import { SocketContext } from "../context/socket_context";
import { AuthContext } from "../context/auth_context";
export default function Home() {
	useEffect(() => {
		window.bridge.ipcRenderer.send("hide");
	}, []);
	return <div>Home</div>;
}

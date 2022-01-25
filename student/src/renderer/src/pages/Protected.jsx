import React, { useContext, useEffect, Fragment } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/auth_context";
import { SocketContext } from "../context/socket_context";

export default function Protected() {
	const { isAuthenticated, auth } = useContext(AuthContext);
	const socket = useContext(SocketContext);

	const navigate = useNavigate();

	function join({ name, room, ip }) {
		socket.emit("join", { name, room, ip, screen: uuid() }, (error) => {
			if (error) {
				alert(error);
			}
		});
	}

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate("/sign_in", { replace: true });
		} else {
			const name = `${auth.user.first_name} ${auth.user.last_name}`;
			const room = "root";
			const ip = window.bridge.ip;
			join({ name, room, ip });
		}
	}, []);

	useEffect(() => {
		socket.on("navigate", (data) => {
			navigate(data);
		});
	}, [socket]);

	useEffect(() => {
		if (isAuthenticated()) {
			setInterval(() => {
				window.bridge.ipcRenderer.send("screenshot");
			}, 5000);
		}
	}, [socket, isAuthenticated]);

	useEffect(() => {
		window.bridge.ipcRenderer.on("image_created", (event, arg) => {
			socket.emit("update-screenshot", { image: arg });
		});
	});
	return (
		<Fragment>
			<Outlet />
		</Fragment>
	);
}

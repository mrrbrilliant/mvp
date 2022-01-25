import React, { useContext, useEffect, Fragment } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../context/auth_context";
import { SocketContext } from "../context/socket_context";

export default function Protected() {
	const { isAuthenticated, auth } = useContext(AuthContext);
	const socket = useContext(SocketContext);

	const navigate = useNavigate();
	const ip = window.bridge.ip;

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
			window.bridge.ipcRenderer.send("show");
		} else {
			const name = `${auth.user.first_name} ${auth.user.last_name}`;
			const room = "root";

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
			const image_url = `http://${ip}:4001/public/${arg}`;
			socket.emit("update-screenshot", { image: image_url });
		});
	});

	useEffect(() => {
		if (isAuthenticated()) {
			socket.on("watch-teacher", ({ ip }) => {
				window.bridge.ipcRenderer.send("watch-teacher", { ip: ip });
			});
		}
	}, [socket, isAuthenticated]);

	return (
		<Fragment>
			<Outlet />
		</Fragment>
	);
}

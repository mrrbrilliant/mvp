import React, { useContext, useEffect, Fragment } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import { SocketContext } from "../context/socket_context";
import { StoreContext, ACTION } from "../context/store_context";

export default function Protected() {
	const { isAuthenticated, auth } = useContext(AuthContext);
	// const { dispatch } = useContext(StoreContext);
	const { store, dispatch } = useContext(StoreContext);

	const socket = useContext(SocketContext);

	const navigate = useNavigate();

	function join({ name, room, ip }) {
		socket.emit("join", { name, room, ip }, (error) => {
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
		socket.on("screen-update", (data) => {
			dispatch({ type: ACTION.UPDATE_SCREEN, payload: { ...data } });
		});
	}, [socket]);

	return (
		<Fragment>
			<Outlet />
		</Fragment>
	);
}

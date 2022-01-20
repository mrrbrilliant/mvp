import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SocketContext } from "../context/socket_context";
import { AuthContext } from "../context/auth_context";

const initialState = { email: "", password: "" };

export default function SignIn() {
	const [form, setForm] = useState(initialState);
	const socket = useContext(SocketContext);
	const { auth, isAuthenticated, sign_in } = useContext(AuthContext);
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		socket.emit("/user/sign_in", { ...form });
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	}

	useEffect(() => {
		socket.on("/user/sign_in", (data) => {
			sign_in({ token: data.token });
		});
	}, [socket, sign_in]);

	useEffect(() => {
		if (isAuthenticated()) {
			navigate("/", { replace: true });
		}
	}, [isAuthenticated]);

	return (
		<div id="sign_in">
			<form onSubmit={handleSubmit}>
				<h1>SIGN IN</h1>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={form.password}
					onChange={handleChange}
				/>
				<input type="submit" name="submit" value="Sign In" />
				<button onClick={() => navigate("/sign_up")}>SIGN UP</button>
			</form>
		</div>
	);
}

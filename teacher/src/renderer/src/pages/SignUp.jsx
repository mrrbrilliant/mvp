import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/socket_context";
import { useNavigate } from "react-router-dom";
const initialState = {
	first_name: "",
	last_name: "",
	email: "",
	password: "",
};

export default function SignUp() {
	const [form, setForm] = useState(initialState);
	const socket = useContext(SocketContext);
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		socket.emit("/user/sign_up", { ...form });
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	}

	useEffect(() => {
		socket.on("/user/sign_up", (data) => {
			navigate("/sign_in", { replace: true });
		});
	}, [socket, navigate]);

	return (
		<div id="sign_up">
			<form onSubmit={handleSubmit}>
				<h1>SIGN UP</h1>
				<input
					type="text"
					name="first_name"
					placeholder="First Name"
					value={form.first_name}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="last_name"
					placeholder="Last Name"
					value={form.last_name}
					onChange={handleChange}
				/>
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
				<input type="submit" name="submit" value="Sign Up" />
			</form>
		</div>
	);
}

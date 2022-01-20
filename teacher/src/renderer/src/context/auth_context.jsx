import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function initialAuth() {
	const token = window.localStorage.getItem("AUTH_TOKEN");
	const guess = {
		authorized: false,
		user: { name: "guess", email: "guess@mail.com", role: "guess" },
	};
	if (!token) {
		return guess;
	}
	try {
		const decoded = jwt_decode(token);
		return {
			authorized: true,
			user: decoded,
		};
	} catch (err) {
		return guess;
	}
}

export const AuthContext = createContext(null);
AuthContext.displayName = "AUTH";

export function AuthProvider({ children }) {
	const [auth, setAuth] = useState(initialAuth());

	function sign_in({ token }) {
		window.localStorage.setItem("AUTH_TOKEN", token);
		setAuth(initialAuth());
	}

	function sign_out() {
		window.localStorage.removeItem("AUTH_TOKEN");
		setAuth(initialAuth());
	}

	function isAuthenticated() {
		return auth.authorized;
	}

	return (
		<AuthContext.Provider value={{ auth, isAuthenticated, sign_in, sign_out }}>
			{children}
		</AuthContext.Provider>
	);
}

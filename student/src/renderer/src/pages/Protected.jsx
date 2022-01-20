import React, { useContext, useEffect, Fragment } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
export default function Protected() {
	const { isAuthenticated } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate("/sign_in", { replace: true });
		}
	}, []);

	return (
		<Fragment>
			<Outlet />
		</Fragment>
	);
}

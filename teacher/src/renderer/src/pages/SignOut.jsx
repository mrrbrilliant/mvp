import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";

export default function SignOut() {
	const { sign_out } = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		sign_out();
		navigate("/sign_in", { replace: true });
	}, [sign_out, navigate]);
	return <div></div>;
}

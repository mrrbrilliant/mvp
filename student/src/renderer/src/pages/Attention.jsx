import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth_context";

export default function Attention() {
	const { auth } = useContext(AuthContext);

	useEffect(() => {
		console.log(auth);
		window.bridge.ipcRenderer.send("enter-always-on-top");

		return function cleanup() {
			window.bridge.ipcRenderer.send("leave-always-on-top");
		};
	}, []);

	return (
		<div className="w-screen h-screen text-yellow-600 select-none cursor-not-allowed bg-slate-900 grid place-items-center">
			<div className="grid place-items-center gap-8">
				<h1 className="text-6xl font-bold">
					{auth.user.first_name || "កូនសិស្ស"}
				</h1>
				<p className="text-2xl font-light">សូមផ្តោតអារម្មណ៍ ទៅលើគ្រូរបស់អ្នក</p>
			</div>
		</div>
	);
}

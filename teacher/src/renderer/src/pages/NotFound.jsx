import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div className="w-screen h-screen text-yellow-600 select-none cursor-not-allowed bg-slate-900 grid place-items-center">
			<div className="grid place-items-center gap-8">
				<h1 className="text-6xl font-bold">៤០៤</h1>
				<p className="text-2xl font-light">មិនមានទំព័រមិនត្រឹមត្រូវ</p>
				<button
					onClick={() => navigate("/")}
					className="px-4 py-2 bg-none border-2 border-yellow-600 rounded-lg "
				>
					ទៅទំព័រដើម
				</button>
			</div>
		</div>
	);
}

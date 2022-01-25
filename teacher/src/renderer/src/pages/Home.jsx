import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket_context";
import { StoreContext, ACTION } from "../context/store_context";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
	const [roomData, setRoomData] = useState([]);
	const socket = useContext(SocketContext);
	const { store, dispatch } = useContext(StoreContext);
	const navigate = useNavigate();
	const ip = window.bridge.ip;

	// function join({ name, room, ip }) {
	// 	socket.emit("join", { name, room, ip }, (error) => {
	// 		if (error) {
	// 			alert(error);
	// 		}
	// 	});
	// }

	// useEffect(() => {
	// 	socket.emit("join", { room: "root", name: "teacher", ip }, (error) => {
	// 		if (error) {
	// 			alert(error);
	// 		}
	// 	});
	// }, [socket, ip]);

	useEffect(() => {
		socket.on("roomData", (data) => {
			dispatch({ type: ACTION.ROOM_DATA_UPDATE, payload: data });
		});
	}, [socket, dispatch]);

	useEffect(() => {
		socket.on("user-left", () => {
			socket.emit("roomData");
		});
	}, [socket]);

	return (
		<div id="home">
			<div className="bg-gray-400">
				<div className="w-full h-auto bg-blue-200 flex flex-col px-4 py-2 gap-4 sticky top-0">
					<div className="w-full h-14">
						<div className="w-full h-full flex place-items-center space-x-4">
							<div
								className="px-4 py-2 bg-blue-700 text-white shadow rounded-lg "
								onClick={() => socket.emit("watch-someone", { ip: ip })}
							>
								មើលគ្រូ
							</div>
							<div
								className="px-4 py-2 bg-blue-700 text-white shadow rounded-lg"
								onClick={() => socket.emit("navigate", "/attention")}
							>
								ចាក់សោរ
							</div>
							<div
								className="px-4 py-2 bg-blue-700 text-white shadow rounded-lg"
								onClick={() => socket.emit("navigate", "/")}
							>
								ដោះសោរ
							</div>
							<div className="px-4 py-2 bg-blue-700 text-white shadow rounded-lg">
								ចែកឯកសារ
							</div>
							<div className="flex-grow"></div>
							<div
								className="px-4 py-2 bg-red-700 shadow rounded-lg text-white"
								onClick={() => navigate("/sign_out")}
							>
								ចាកចេញ
							</div>
						</div>
					</div>
				</div>
				<Monitor />
			</div>
		</div>
	);
}

function Monitor() {
	const { store, dispatch } = useContext(StoreContext);

	return (
		<div id="monitor">
			{store.room_data.map((data) => (
				<div className="h-auto rounded-xl flex flex-col" key={data._id}>
					<div className="w-full aspect-video overflow-hidden">
						{data.screen ? (
							<img className="w-full rounded-lg" src={data.screen} alt="" />
						) : (
							<div className="w-full h-full bg-white rounded-lg"></div>
						)}
					</div>
					<div className="w-full flex place-items-center p-3 gap-2">
						<p className="flex-grow">{data.name}</p>
						<button
							className="m-0"
							onClick={() =>
								window.bridge.ipcRenderer.send("remote-view", data.ip)
							}
						>
							មើល
						</button>
						<button
							className="m-0"
							onClick={() =>
								window.bridge.ipcRenderer.send("remote-control", data.ip)
							}
						>
							បញ្ជា
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

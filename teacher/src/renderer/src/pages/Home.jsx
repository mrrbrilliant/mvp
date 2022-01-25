import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket_context";
import { StoreContext, ACTION } from "../context/store_context";
import { Link } from "react-router-dom";

export default function Home() {
	const [roomData, setRoomData] = useState([]);
	const socket = useContext(SocketContext);
	const { store, dispatch } = useContext(StoreContext);
	// const ip = window.bridge.ip;

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
			<div>
				<div id="nav">
					<div className="aspect-square bg-pink-300 rounded-lg"></div>
					<div className="aspect-square bg-pink-300 rounded-lg"></div>
					<div className="aspect-square bg-pink-300 rounded-lg"></div>
					<div className="aspect-square bg-pink-300 rounded-lg">
						<Link to="/sign_out">LEAVE</Link>
					</div>
				</div>
			</div>
			<div>
				<div id="ribbon">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
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
				<div className="screen" key={data._id}>
					{data.screen ? <img w="100" src={data.screen} alt="" /> : ""}
					<p>{data.name}</p>
					<p>{data.ip}</p>
					<button
						onClick={() => window.bridge.ipcRenderer.send("remote", data.ip)}
					>
						RC
					</button>
				</div>
			))}
		</div>
	);
}

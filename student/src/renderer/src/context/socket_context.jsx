import { createContext } from "react";
import io from "socket.io-client";

const initialSocket = io("http://10.1.2.40");
export const SocketContext = createContext(null);
SocketContext.displayName = "SOCKET";

export function SocketProvider({ children }) {
	const socket = initialSocket;
	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
}

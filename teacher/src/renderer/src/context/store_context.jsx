import React, { createContext, useReducer } from "react";

const initialState = {
	room_data: [],
};

export const StoreContext = createContext();
StoreContext.displayName = "Store";

export const ACTION = {
	ROOM_DATA_UPDATE: "ROOM_DATA_UPDATE",
	UPDATE_SCREEN: "UPDATE_SCREEN",
};

const reducer = (state, action) => {
	switch (action.type) {
		case ACTION.ROOM_DATA_UPDATE:
			return { ...state, room_data: [...action.payload] };
		case ACTION.UPDATE_SCREEN:
			// const new_data = action.payload;
			// console.log(new_data);
			// const index = state.room_data.indexOf(
			// 	(d) => d.socket_id == new_data.socket_id
			// );
			// console.log(index);
			// // let new_room_data = state.room_data;
			// // new_room_data[index].screen = action.payload.image;
			// // return { ...state, room_data: new_room_data };
			console.log(action.payload);
			const new_room_data = state.room_data.map((d) => {
				if (d._id === action.payload._id) {
					return action.payload;
				}
				return d;
			});
			return { ...state, room_data: new_room_data };
		default:
			return state;
	}
};

export const StoreProvider = ({ children }) => {
	const [store, dispatch] = useReducer(reducer, initialState);

	return (
		<StoreContext.Provider value={{ store, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

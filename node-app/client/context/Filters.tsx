import React, { createContext } from "react";

const initialState = {
	coordinates: [],
	maxDistance: process.browser
		? localStorage.getItem("maxDistance") || 100
		: 100,
};

const storeAndGetMaxDistance = ({ maxDistance }: any) => {
	if (process.browser) {
		localStorage.setItem("maxDistance", maxDistance);
		return parseFloat(localStorage.getItem("maxDistance") as string);
	}
};

const storeAndGetCoordinates = ({ lng, lat }: any) => {
	if (process.browser) {
		localStorage.setItem("coordinates", JSON.stringify({ lng, lat }));
		const { coordinates } = JSON.parse(
			localStorage.getItem("coordinates") as string
		);
		return coordinates;
	}
};

let reducer = (state: any, action: any) => {
	switch (action.type) {
		case "SET_DISTANCE":
			return {
				...state,
				maxDistance: storeAndGetMaxDistance(action.payload),
			};
		case "SET_COORDINATES":
			return {
				...state,
				coordinates: [action.payload[0], action.payload[1]],
			};
	}
};

let FiltersContext = createContext(initialState);

function FiltersContextProvider(props: any) {
	let [state, dispatch] = React.useReducer(reducer, initialState);
	let value = { state, dispatch };
	return (
		<FiltersContext.Provider value={value as any}>
			{props.children}
		</FiltersContext.Provider>
	);
}

let FiltersContextConsumer = FiltersContext.Consumer;

export { FiltersContext, FiltersContextProvider, FiltersContextConsumer };

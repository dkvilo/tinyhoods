import React, { createContext } from "react";

interface ILoaderProgressType {
	loading: boolean;
}

const initialState: ILoaderProgressType = {
	loading: false,
};

let reducer = (state: any, action: any) => {
	switch (action.type) {
		case "START":
			return {
				loading: true,
			};
		case "STOP":
			return {
				loading: false,
			};
	}
};

let LoaderProgressContext = createContext(initialState);

function LoaderProgressContextProvider(props: any) {
	let [state, dispatch] = React.useReducer(reducer, initialState);
	let value = { state, dispatch };
	return (
		<LoaderProgressContext.Provider value={value as any}>
			{props.children}
		</LoaderProgressContext.Provider>
	);
}

let LoaderProgressContextConsumer = LoaderProgressContext.Consumer;

export {
	LoaderProgressContext,
	LoaderProgressContextProvider,
	LoaderProgressContextConsumer,
};

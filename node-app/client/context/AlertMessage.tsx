import React, { createContext } from "react";

interface IAlertMessageType {
	message: string | null;
	title: string;
	hasMessage: boolean;
}

const initialState: IAlertMessageType = {
	message: null,
	title: "",
	hasMessage: false,
};

let reducer = (state: any, action: any) => {
	switch (action.type) {
		case "ENGAGE_ERROR":
			return initialState;
		case "SET_MESSAGE":
			return {
				...state,
				message: action.payload.message,
				title: action.payload.title,
				hasMessage: true,
			};
		case "UNSET_MESSAGE":
			return {
				message: null,
				title: null,
				hasMessage: false,
			};
	}
};

let AlertMessageContext = createContext<IAlertMessageType>(initialState);

function AlertMessageContextProvider(props: any) {
	let [state, dispatch] = React.useReducer(reducer, initialState);
	let value = { state, dispatch };
	return (
		<AlertMessageContext.Provider value={value as any}>
			{props.children}
		</AlertMessageContext.Provider>
	);
}

let AlertMessageContextConsumer = AlertMessageContext.Consumer;

export {
	AlertMessageContext,
	AlertMessageContextProvider,
	AlertMessageContextConsumer,
};

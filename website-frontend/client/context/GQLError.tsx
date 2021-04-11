import React, { createContext } from "react";
import { ApolloError } from "apollo-boost";

interface IGQLErrorType {
	error: ApolloError | null;
	title: string;
	hasError: boolean;
}

const initialState: IGQLErrorType = {
	error: null,
	title: "",
	hasError: false,
};

let reducer = (state: any, action: any) => {
	switch (action.type) {
		case "ENGAGE_ERROR":
			return initialState;
		case "SET_ERROR":
			return {
				...state,
				error: action.payload.error,
				title: action.payload.title,
				hasError: true,
			};
		case "UNSET_ERROR":
			return {
				error: null,
				title: null,
				hasError: false,
			};
	}
};

let GQLErrorContext = createContext<IGQLErrorType>(initialState);

function GQLErrorContextProvider(props: any) {
	let [state, dispatch] = React.useReducer(reducer, initialState);
	let value = { state, dispatch };
	return (
		<GQLErrorContext.Provider value={value as any}>
			{props.children}
		</GQLErrorContext.Provider>
	);
}

let GQLErrorContextConsumer = GQLErrorContext.Consumer;

export { GQLErrorContext, GQLErrorContextProvider, GQLErrorContextConsumer };

import React, { createContext } from "react";

const initialState = {
	isLogin: Boolean(process.browser ? localStorage.getItem("token") : null),
	token: process.browser ? localStorage.getItem("token") || null : null,
};

const storeAndGetToken = ({ token }: any) => {
	if (process.browser) {
		localStorage.setItem("token", token);
		return localStorage.getItem("token");
	}

	return null;
};

const destroyToken = () => {
	if (process.browser) {
		localStorage.removeItem("token");
		return null;
	}
};

let reducer = (state: any, action: any) => {
	switch (action.type) {
		case "ENGAGE_TOKEN":
			return initialState;
		case "SET_TOKEN":
			return {
				...state,
				isLogin: true,
				token: storeAndGetToken(action.payload),
			};
		case "UNSET_TOKEN":
			return { ...state, isLogin: false, token: destroyToken() };
	}
};

let UserTokenContext = createContext(initialState);

function UserTokenContextProvider(props: any) {
	let [state, dispatch] = React.useReducer(reducer, initialState);
	let value = { state, dispatch };
	return (
		<UserTokenContext.Provider value={value as any}>
			{props.children}
		</UserTokenContext.Provider>
	);
}

let UserTokenContextConsumer = UserTokenContext.Consumer;

export { UserTokenContext, UserTokenContextProvider, UserTokenContextConsumer };

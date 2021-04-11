import React, { createContext, useReducer } from "react";

export enum UserTokenActionTypes {
	Engage = "ENGAGE_TOKEN",
	Set = "SET_TOKEN",
	Unset = "UNSET_TOKEN",
}

export interface UserTokenContentType {
	isLogin: boolean;
	token: string | null;
}

const initialState: UserTokenContentType = {
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

let reducer = (
	state: UserTokenContentType,
	action: { type: UserTokenActionTypes; payload: UserTokenContentType }
) => {
	switch (action.type) {
		case UserTokenActionTypes.Engage:
			return initialState;
		case UserTokenActionTypes.Set:
			return {
				...state,
				isLogin: true,
				token: storeAndGetToken(action.payload),
			};
		case UserTokenActionTypes.Unset:
			return { ...state, isLogin: false, token: destroyToken() };
	}
};

let UserTokenContext = createContext<{
	state: UserTokenContentType;
	dispatch: React.Dispatch<{
		type: UserTokenActionTypes;
		payload: UserTokenContentType;
	}>;
}>({
	state: initialState,
	dispatch: () => null,
});

function UserTokenContextProvider(props: any) {
	let [state, dispatch] = useReducer<any>(reducer, initialState);

	return (
		<UserTokenContext.Provider value={{ state, dispatch } as any}>
			{props.children}
		</UserTokenContext.Provider>
	);
}

let UserTokenContextConsumer = UserTokenContext.Consumer;

export { UserTokenContext, UserTokenContextProvider, UserTokenContextConsumer };

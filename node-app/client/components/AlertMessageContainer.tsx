import { useContext } from "react";

import { AlertMessageContext } from "../context";

import AlertMessage from "./AlertMessage";

function AlertMessageContainer(): JSX.Element | null {
	const { state } = useContext<any>(AlertMessageContext);
	if (state.hasMessage)
		return <AlertMessage title={state.title} message={state.message} />;
	return null;
}

export default AlertMessageContainer;

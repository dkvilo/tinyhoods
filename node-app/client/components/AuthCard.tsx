import React, { useCallback, useState } from "react";
import Registration from "../forms/user/Registration";
import Authentication from "../forms/user/Authentication";
import Button from "./Button";

function AuthCard() {
	const [authViewState, setAuthViewState] = useState(false);

	const switchAuthState = useCallback(() => {
		setAuthViewState(!authViewState);
	}, [authViewState, setAuthViewState]);

	return (
		<>
			{authViewState ? <Registration /> : <Authentication />}
			<div className="flex items-center justify-center my-6">
				<Button onClick={switchAuthState}>
					{authViewState
						? "Already have an account?"
						: "Don't have an account?"}
				</Button>
			</div>
		</>
	);
}

export default AuthCard;

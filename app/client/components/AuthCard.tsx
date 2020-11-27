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
		<div className="my-1 py-5 px-4">
			{authViewState ? <Registration /> : <Authentication />}
			<div className="flex items-center justify-center my-2">
				<Button
					onClick={switchAuthState}
					className="bg-transparent text-primary focus:outline-none p-2"
				>
					{authViewState
						? "Already have an account?"
						: "Don't have an account?"}
				</Button>
			</div>
		</div>
	);
}

export default AuthCard;

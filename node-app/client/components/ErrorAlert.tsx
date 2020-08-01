import React, { useEffect, useContext } from "react";
import { GQLErrorContext } from "../context";

interface IProps {
	message: string | null;
	timeOut?: number;
	autoUnmount?: boolean;
	title?: string | null;
}

function ErrorAlert({
	message,
	timeOut = 3000,
	autoUnmount = true,
	title,
}: IProps): React.ReactElement {
	const { dispatch } = useContext<any>(GQLErrorContext);

	useEffect(() => {
		if (autoUnmount) {
			const timer = setTimeout(() => {
				dispatch({ type: "UNSET_ERROR" });
			}, timeOut);

			return () => {
				clearTimeout(timer);
			};
		}
		// eslint-disable-next-line
	}, [timeOut, autoUnmount]);

	return (
		<div
			className="border-t-4 border-red-500 fixed shadow-lg bg-red-200 mx-auto bottom-0 w-screen flex items-center justify-center"
			style={{
				zIndex: 999999,
			}}
		>
			<div className="p-2 text-center text-dark">
				<div className="text-lg">{title}</div>
				<div className="text-md">{message}</div>
			</div>
		</div>
	);
}

export default ErrorAlert;

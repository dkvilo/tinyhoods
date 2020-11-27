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
			className="fixed mx-auto w-screen bg-red-500 flex items-center justify-center"
			style={{
				zIndex: 999999,
				bottom: 0,
			}}
		>
			<div className="p-2 text-center text-default">
				<div className="text-lg font-bold">{title}</div>
				<div className="text-md">{message}</div>
			</div>
		</div>
	);
}

export default ErrorAlert;

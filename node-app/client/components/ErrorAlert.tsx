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
			className="fixed bottom-0 shadow-lg rounded-lg bg-secondary-soft mx-auto m-8 p-2 flex items-center"
			style={{
				right: 20,
				zIndex: 8888,
			}}
		>
			<svg
				className="fill-current text-default-inverted"
				viewBox="0 0 24 24"
				width="24"
				height="24"
			>
				<path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 9a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
			</svg>
			<div className="p-2">
				<div className="text-sm pb-2 text-primary">{title}</div>
				<div className="text-sm text-primary">{message}</div>
			</div>
		</div>
	);
}

export default ErrorAlert;

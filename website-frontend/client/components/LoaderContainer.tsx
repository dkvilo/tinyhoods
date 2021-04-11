import { useContext } from "react";

import { LoaderProgressContext } from "../context";

import InlineLoader from "./InlineLoader";

function LoaderContainer(): JSX.Element {
	const { state: loaderState } = useContext<any>(LoaderProgressContext);

	return (
		<>
			{loaderState.loading && (
				<div
					style={{
						zIndex: 8888,
						position: "absolute",
						top: 0,
						width: "100%",
					}}
				>
					<InlineLoader />
				</div>
			)}
		</>
	);
}

export default LoaderContainer;

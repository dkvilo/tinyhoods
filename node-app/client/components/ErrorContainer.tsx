import { useContext } from "react";

import { GQLErrorContext } from "../context";

import GQLError from "./GQLError";

function ErrorContainer(): JSX.Element {
	const { state: errorState } = useContext<any>(GQLErrorContext);

	return (
		<>
			{errorState.hasError && (
				<GQLError title={errorState.title} error={errorState.error} />
			)}
		</>
	);
}

export default ErrorContainer;

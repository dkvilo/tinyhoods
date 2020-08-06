import React, { memo } from "react";

import ErrorAlert from "./ErrorAlert";

function GQLError({ error, title }: any): JSX.Element {
	return (
		<>
			{JSON.parse(JSON.stringify(error as any)).graphQLErrors.map(
				(error: string) => (
					<ErrorAlert
						key={error + Math.random()}
						timeOut={5000}
						title={title}
						message={error}
					/>
				)
			)}
		</>
	);
}

export default memo(GQLError);

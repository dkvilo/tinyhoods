import React, { memo } from "react";

function Loader(): JSX.Element {
	return (
		<div className="spinner-loader" id="loader-inline-dots">
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
}

export default memo(Loader);

import React, { memo } from "react";

function InlineLoader(): JSX.Element {
	return <div className="w-full relative inline-loader-top" />;
}

export default memo(InlineLoader);

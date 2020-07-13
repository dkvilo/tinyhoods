import React from "react";

interface IProps {
	children: React.ReactChild;
	margin?: number;
	background?: string;
}

export default function ({
	children,
	margin = 4,
	background = "transparent",
}: IProps): JSX.Element {
	return <div className={`m-${margin} bg-${background}`}>{children}</div>;
}

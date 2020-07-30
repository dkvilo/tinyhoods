import React from "react";

interface IProps {
	children: React.ReactChild;
	margin?: number;
	background?: string;
}

export default function ({
	children,
	background = "transparent",
}: IProps): JSX.Element {
	return <div className={`m-4 bg-${background}`}>{children}</div>;
}

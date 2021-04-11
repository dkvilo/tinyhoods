import React from "react";

interface IProps {
	children: React.ReactChild;
	margin?: number;
	background?: string;
}

export default function Grid({
	children,
	background = "transparent",
}: IProps): JSX.Element {
	return <div className={`m-2 bg-${background}`}>{children}</div>;
}

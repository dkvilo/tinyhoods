import React from "react";

export default function Button(
	props: React.ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element {
	return (
		<button
			className="text-primary p-1 px-2 bg-default rounded-full focus:outline-none"
			{...props}
		></button>
	);
}

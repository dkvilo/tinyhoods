import React from "react";

export default function (
	props: React.ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element {
	return (
		<button
			className="text-primary p-2 bg-secondary-soft rounded-full"
			{...props}
		></button>
	);
}

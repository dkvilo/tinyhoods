import React from "react";

export default function (
	props: React.ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element {
	return (
		<button
			className="bg-primary text-default p-2 rounded shadow-md hover:bg-red-500"
			{...props}
		></button>
	);
}

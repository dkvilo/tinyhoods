import React from "react";

export default function (
	props: React.InputHTMLAttributes<HTMLInputElement>
): JSX.Element {
	return (
		<input
			className="rounded-lg text-left w-full bg-default outline-none placeholder-primary text-primary p-2"
			{...props}
		/>
	);
}

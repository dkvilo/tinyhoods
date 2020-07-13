import React from "react";

export default function (
	props: React.InputHTMLAttributes<HTMLInputElement>
): JSX.Element {
	return (
		<input
			className="bg-secondary rounded-lg w-full outline-none placeholder-primary text-primary p-2"
			{...props}
		/>
	);
}

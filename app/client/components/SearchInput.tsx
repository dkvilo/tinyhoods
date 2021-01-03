import React from "react";

export default function (
	props: React.InputHTMLAttributes<HTMLInputElement>
): JSX.Element {
	return (
		<input
			className="rounded-lg text-left w-full bg-secondary rounded-full py-1 px-2 outline-none placeholder-default-inverted text-default-inverted font-bold"
			{...props}
		/>
	);
}

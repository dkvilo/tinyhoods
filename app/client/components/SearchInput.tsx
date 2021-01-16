import React from "react";

export default function SearchInput(
	props: React.InputHTMLAttributes<HTMLInputElement>
): JSX.Element {
	return (
		<input
			className="py-1 px-2 bg-transparent outline-none placeholder-default-inverted text-default-inverted font-bold"
			{...props}
		/>
	);
}

import React from "react";

export default function Input(
	props: React.InputHTMLAttributes<HTMLInputElement>
): JSX.Element {
	return (
		<input
			className="bg-secondary rounded-lg w-full outline-none placeholder-default-inverted text-default-inverted p-2"
			{...props}
		/>
	);
}

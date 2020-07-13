import React from "react";

export default function (
	props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
): JSX.Element {
	return (
		<textarea
			className="bg-secondary rounded-lg w-full outline-none placeholder-primary text-primary p-3"
			{...props}
		></textarea>
	);
}

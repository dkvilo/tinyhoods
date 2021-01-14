import React from "react";
import { Field } from "formik";

export default function (
	props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
): JSX.Element {
	return (
		<Field
			component="textarea"
			className="bg-secondary-soft resize-y rounded-md w-full outline-none placeholder-default-inverted text-default-inverted p-3 border-2 focus:border-green-500 hover:bg-secondary transition duration-150"
			{...props}
		></Field>
	);
}

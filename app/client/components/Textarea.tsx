import React from "react";
import { Field } from "formik";

export default function (
	props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
): JSX.Element {
	return (
		<Field
			component="textarea"
			className="bg-secondary resize-y rounded-md w-full outline-none placeholder-default-inverted text-default-inverted p-3"
			{...props}
		></Field>
	);
}

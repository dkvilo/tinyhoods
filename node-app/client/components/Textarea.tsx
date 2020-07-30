import React from "react";
import { Field } from "formik";

export default function (
	props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
): JSX.Element {
	return (
		<Field
			component="textarea"
			className="bg-secondary rounded-lg w-full outline-none placeholder-primary text-primary p-3"
			{...props}
		></Field>
	);
}

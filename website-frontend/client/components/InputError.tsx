import React from "react";
import { ErrorMessage } from "formik";

interface IProps {
	name: string;
}

function InputError({ name }: IProps): React.ReactElement {
	return (
		<ErrorMessage
			className="text-xs text-red-500"
			name={name}
			component="div"
		/>
	);
}

export default InputError;

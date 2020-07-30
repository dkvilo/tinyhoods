import React from "react";

import { Field, useField } from "formik";

function InputSwitch(props: any) {
	const { name, onSave } = props;
	const [values] = useField(name);

	return (
		<button
			onClick={() => {
				onSave(values.value);
			}}
			className="cursor-pointer"
			style={{
				outline: "none",
			}}
		>
			<div
				className={`relative rounded-full w-12 h-6 transition duration-200 ease-linear 
        ${values.value ? "bg-green-400" : "bg-gray-400"}`}
			>
				<label
					htmlFor={name}
					className={`absolute left-0 bg-secondary border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear cursor-pointer ${
						values.value
							? "translate-x-full border-green-400"
							: "translate-x-0 border-gray-400"
					}`}
				/>

				<Field
					name={values.name}
					onChange={values.onChange}
					onBlur={values.onBlur}
					type="checkbox"
					className="opacity-0 w-12 h-full active:outline-none focus:outline-none"
				/>
			</div>
		</button>
	);
}

export default InputSwitch;

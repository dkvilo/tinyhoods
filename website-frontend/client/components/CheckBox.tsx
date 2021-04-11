import React from "react";

import { Field } from "formik";

function CheckBox(props: any) {
	const { text } = props;
	return (
		<label className="custom-label flex hover:bg-secondary-soft rounded-md cursor-pointer p-1">
			<div className=" bg-default border border-secondary-soft w-6 h-6 flex justify-center items-center mr-2 rounded-full shadow-sm cursor-pointer">
				<Field {...props} className="hidden" type="checkbox" />
				<svg
					className=" hidden w-4 h-4 text-primary pointer-events-none"
					viewBox="0 0 172 172"
				>
					<g
						fill="none"
						strokeWidth="none"
						strokeMiterlimit="10"
						fontFamily="none"
						fontWeight="none"
						fontSize="none"
						textAnchor="none"
						className="svg-blend-mode"
					>
						<path d="M0 172V0h172v172z" />
						<path
							d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
							fill="currentColor"
							strokeWidth="1"
						/>
					</g>
				</svg>
			</div>
			<span className=" select-none text-sm text-primary">{text && text}</span>
		</label>
	);
}

export default CheckBox;

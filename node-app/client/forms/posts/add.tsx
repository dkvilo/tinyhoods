import React from "react";
import { Formik } from "formik";
import { gql } from "apollo-boost";

import Textarea from "../../components/Textarea";
import Input from "../../components/Input";
import { useMutation } from "@apollo/react-hooks";
import DraggableMapInput from "../../components/DraggableMapInput";
import CheckBox from "../../components/CheckBox";

const CREATE_LOCATION = gql`
	mutation createLocation($data: LocationDataInput!) {
		createLocation(data: $data)
	}
`;

const AddPost = () => {
	const [createLocation, { loading, error }] = useMutation(CREATE_LOCATION);

	return (
		<div>
			<Formik
				initialValues={{
					isPrivate: false,
					name: "",
					text: "",
				}}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						setSubmitting(true);
						// 	const { coordinates, onMap, ...withoutCoords } = values;
						// 	const response = await createLocation({
						// 		variables: {
						// 			data: {
						// 				...withoutCoords,
						// 				coordinates: {
						// 					latitude: parseFloat(coordinates.latitude as any),
						// 					longitude: parseFloat(coordinates.longitude as any),
						// 					accuracy: parseFloat(coordinates.accuracy as any),
						// 				},
						// 			},
						// 		},
						// 	});
					} catch {}

					// setSubmitting(false);
				}}
			>
				{({
					values,
					errors,
					touched,
					setFieldValue,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					/* and other goodies */
				}) => (
					<form onSubmit={handleSubmit}>
						<div className="my-4">
							<Textarea
								placeholder="Aks or share opinion"
								name="text"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.text}
							/>
						</div>

						<div className="my-4">
							<CheckBox
								text="Only For Followers"
								name="isPrivate"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>

						<div className="flex justify-center pt-2">
							<button
								className="px-4 bg-primary w-full p-3 text-default rounded-full mr-2"
								type="submit"
								disabled={isSubmitting}
							>
								Post
							</button>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default AddPost;

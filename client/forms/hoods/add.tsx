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

const AddHood = () => {
	const [createLocation, { loading, error }] = useMutation(CREATE_LOCATION);

	return (
		<div>
			<Formik
				initialValues={{
					onMap: false,
					name: "",
					description: "",
					cover: "",
					address: "",
					coordinates: {
						latitude: null,
						longitude: null,
						accuracy: 3,
					},
				}}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						setSubmitting(true);
						const { coordinates, onMap, ...withoutCoords } = values;
						const response = await createLocation({
							variables: {
								data: {
									...withoutCoords,
									coordinates: {
										latitude: parseFloat(coordinates.latitude as any),
										longitude: parseFloat(coordinates.longitude as any),
										accuracy: parseFloat(coordinates.accuracy as any),
									},
								},
							},
						});
					} catch {}

					setSubmitting(false);
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
							{!loading && !error && (
								<div className="bg-secondary p-2 rounded-md text-default-inverted">
									Halloo
								</div>
							)}
						</div>
						<div className="my-4">
							<Input
								placeholder="Name"
								type="text"
								name="name"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
							/>
						</div>

						<div className="my-4">
							<Textarea
								placeholder="Description"
								name="description"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.description}
							/>
						</div>

						<div className="my-4">
							<Input
								placeholder="Address"
								type="text"
								name="address"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.address}
							/>
						</div>

						<div className="my-4">
							<CheckBox
								text="Mark the location on map"
								name="onMap"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>

						{values.onMap && (
							<div className="my-4">
								<h1>Select Location</h1>
								<DraggableMapInput
									onChange={({ lng, lat }: any) => {
										setFieldValue("coordinates.longitude", lng);
										setFieldValue("coordinates.latitude", lat);
									}}
									activeCoordinates={{
										longitude: values.coordinates.longitude || 44.7840256,
										latitude: values.coordinates.latitude || 41.7234944,
									}}
								/>
							</div>
						)}

						<div className="my-4 flex">
							<Input
								placeholder="Latitude"
								type="text"
								name="coordinates.latitude"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.coordinates.latitude as any}
							/>
							<div className="w-6" />
							<Input
								placeholder="Longitude"
								type="text"
								name="coordinates.longitude"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.coordinates.longitude as any}
							/>
						</div>

						<div className="my-4">
							<Input
								placeholder="Image URI"
								type="text"
								name="cover"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.cover}
							/>
						</div>

						<div className="flex justify-center pt-2">
							<button
								className="px-4 bg-primary w-full p-3 text-default rounded-full mr-2"
								type="submit"
								disabled={isSubmitting}
							>
								Save
							</button>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default AddHood;

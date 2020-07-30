import React, { useEffect, useContext } from "react";
import { Formik } from "formik";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";

import Textarea from "../../components/Textarea";
import FromikInput from "../../components/FormikInput";

import getLocationService from "../../services/geoLocation";
import Button from "../../components/Button";
import InputError from "../../components/InputError";

import {
	LoaderProgressContext,
	GQLErrorContext,
	UserTokenContext,
} from "../../context";

const CREATE_LOCATION = gql`
	mutation createLocation($data: LocationDataInput!) {
		createLocation(data: $data)
	}
`;

const AddHood = () => {
	const [createLocation, { loading, error, data }] = useMutation(
		CREATE_LOCATION
	);

	const { dispatch: errorDispatcher } = useContext<any>(GQLErrorContext);
	const { state: loginState } = useContext<any>(UserTokenContext);

	useEffect(() => {
		if (error) {
			errorDispatcher({
				type: "SET_ERROR",
				payload: {
					title: "Authentication",
					error: error,
				},
			});
		}
	}, [error, errorDispatcher]);

	const { dispatch: loaderDispatcher } = useContext<any>(LoaderProgressContext);

	useEffect(() => {
		if (loading) {
			loaderDispatcher({ type: "START" });
		} else {
			loaderDispatcher({ type: "STOP" });
		}
	}, [loading, loaderDispatcher]);

	return (
		<div>
			<Formik
				initialValues={{
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
				validationSchema={Yup.object().shape({
					name: Yup.string().required("Location Name is Required!"),
					description: Yup.string().required(
						"Location Description is Required!"
					),
					address: Yup.string().required("General Address is Required!"),
					coordinates: Yup.object()
						.shape({
							latitude: Yup.number().required("Latitude is Required!"),
							longitude: Yup.number().required("Longitude is Required!"),
						})
						.required("Coordinates is required"),
				})}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						setSubmitting(true);
						const { coordinates, ...withoutCoords } = values;
						const response = await createLocation({
							variables: {
								data: {
									...withoutCoords,
									coordinates: {
										latitude: parseFloat(coordinates.latitude as any),
										longitude: parseFloat(coordinates.longitude as any),
										accuracy: parseFloat(coordinates.accuracy as any),
									},
									token: loginState.token,
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
							{!loading && !error && data?.createLocation && (
								<div className="bg-secondary p-2 rounded-md text-default-inverted">
									Location Was added Successfully
								</div>
							)}
						</div>
						<div className="my-4">
							<FromikInput
								placeholder="Location Name"
								type="text"
								name="name"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<InputError name="name" />
						</div>

						<div className="my-4">
							<Textarea
								placeholder="Describe Location"
								name="description"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<InputError name="description" />
						</div>

						<div className="my-4">
							<FromikInput
								placeholder="General Address"
								type="text"
								name="address"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<InputError name="address" />
						</div>

						<div className="my-4">
							<Button
								onClick={(event: any) => {
									event.preventDefault();
									(async () => {
										const {
											coords: { latitude, longitude },
										}: any = await getLocationService({
											watch: false,
											enableHighAccuracy: true,
										} as any);
										if (longitude && latitude) {
											setFieldValue("coordinates.longitude", longitude);
											setFieldValue("coordinates.latitude", latitude);
										}
									})();
								}}
							>
								<span className="flex items-center">
									<svg
										className="w-4 h-4 mr-1"
										version="1.1"
										id="Capa_1"
										x="0px"
										y="0px"
										viewBox="0 0 425.963 425.963"
									>
										<path
											d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081   c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002   c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482   C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884   c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z"
											className="active-path"
											fill="var(--color-default-inverted)"
										/>
									</svg>{" "}
									Use My current locations
								</span>
							</Button>
						</div>

						{/* {values.onMap && (
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
						)} */}

						<div className="my-4 ">
							<div className="flex">
								<FromikInput
									disabled
									placeholder="Latitude"
									type="text"
									name="coordinates.latitude"
								/>
								<div className="w-6" />
								<FromikInput
									disabled
									placeholder="Longitude"
									type="text"
									name="coordinates.longitude"
								/>
							</div>
							<div className="flex flex-col">
								<InputError name="coordinates.longitude" />
								<InputError name="coordinates.latitude" />
							</div>
						</div>

						<div className="my-4">
							<FromikInput
								placeholder="Image URI"
								type="text"
								name="cover"
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

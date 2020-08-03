import React, { useEffect, useContext } from "react";
import { Formik } from "formik";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import * as Yup from "yup";
import Select from "react-select";
import { isEmpty } from "ramda";

import Textarea from "../../components/Textarea";
import FromikInput from "../../components/FormikInput";

import getLocationService from "../../services/geoLocation";
import Button from "../../components/Button";
import InputError from "../../components/InputError";

import {
	LoaderProgressContext,
	GQLErrorContext,
	UserTokenContext,
	AlertMessageContext,
} from "../../context";

import InputSwitch from "../../components/InputSwitch";

const CREATE_LOCATION = gql`
	mutation createLocation($data: LocationDataInput!) {
		createLocation(data: $data)
	}
`;

const GET_LANDFORM = gql`
	{
		getLandforms {
			description
			id
			name
		}
	}
`;

const GET_FREQUENTLY_USED_KEYWORDS = gql`
	{
		getKeywords {
			name
			id
		}
	}
`;

const AddHood = () => {
	const [createLocation, { loading, error, data }] = useMutation(
		CREATE_LOCATION
	);

	const {
		loading: landFormLoading,
		error: landFormError,
		data: landFormData,
	} = useQuery(GET_LANDFORM);

	const {
		loading: keywordsLoading,
		error: keywordsError,
		data: keywordsData,
	} = useQuery(GET_FREQUENTLY_USED_KEYWORDS);

	const { state: loginState } = useContext<any>(UserTokenContext);
	const { dispatch: errorDispatcher } = useContext<any>(GQLErrorContext);

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

	const { dispatch: messageDispatcher } = useContext<any>(AlertMessageContext);
	useEffect(() => {
		if (!loading && !error && data?.createLocation) {
			messageDispatcher({
				type: "SET_MESSAGE",
				payload: {
					title: "Location",
					message: "Location was added Successfully",
				},
			});
		}
	}, [data, loading, error]);

	return (
		<div>
			<Formik
				initialValues={{
					name: "",
					description: "",
					cover: "",
					address: "",
					landform: "",
					isPrivate: true,
					keywords: [],
					coordinates: {
						latitude: null,
						longitude: null,
					},
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string().required("Location Name is Required!"),
					isPrivate: Yup.boolean().required("Location Type is Required"),
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
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						setSubmitting(true);
						const { coordinates, ...withoutCoords } = values;
						const response = await createLocation({
							variables: {
								data: {
									...withoutCoords,
									geometry: {
										coordinates: [
											parseFloat(coordinates.longitude as any),
											parseFloat(coordinates.latitude as any),
										],
									},
									token: loginState.token,
								},
							},
						});
						resetForm();
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

						{!values.isPrivate && (
							<div className="my-4">
								<Select
									placeholder="Select Landform"
									onChange={(selectedItem: any) => {
										const { value } = selectedItem;
										setFieldValue("landform", value);
									}}
									closeMenuOnSelect
									noOptionsMessage={() => "Landform not found"}
									isMulti={false}
									options={
										!landFormLoading &&
										!landFormError &&
										!isEmpty(landFormData?.getLandforms)
											? landFormData.getLandforms.map((each: any) => ({
													value: each.id,
													label: each.name,
											  }))
											: []
									}
								/>
								<div className="mt-2">
									<InputError name="landform" />
								</div>
							</div>
						)}

						{!values.isPrivate && (
							<div className="my-4">
								<Select
									placeholder="Select Keyword(s)"
									isMulti
									onChange={(selectedItem: any) => {
										setFieldValue(
											"keywords",
											selectedItem.map((each: any) => each.value)
										);
									}}
									closeMenuOnSelect
									noOptionsMessage={() => "Keyword not found"}
									options={
										!keywordsLoading &&
										!keywordsError &&
										!isEmpty(keywordsData?.getKeywords)
											? keywordsData.getKeywords.map((each: any) => ({
													value: each.id,
													label: each.name,
											  }))
											: []
									}
								/>
								<div className="mt-2">
									<InputError name="landform" />
								</div>
							</div>
						)}

						<div className="my-6 flex">
							<InputSwitch name="isPrivate" />
							<span className="block text-primary ml-2">
								{values.isPrivate ? "Private Location" : "Public Locations"}
							</span>
						</div>
						<div className="p-2 mb-4 bg-secondary text-sm rounded-md text-default-inverted">
							{values.isPrivate
								? "This location will be visible only on your profile, mentioned as part of your personal memory, experience"
								: "This location will be publicly available and you will be mentioned as an explorer"}
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

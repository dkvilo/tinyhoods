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
	FiltersContext,
} from "../../context";

import InputSwitch from "../../components/InputSwitch";
import ImageUpload from "../../components/ImageUpload";
import DraggableMapInput from "../../components/DraggableMapInput";

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

	const { state: filterState, dispatch: filterDispatcher } = useContext<any>(
		FiltersContext
	);

	useEffect(() => {
		(async () => {
			const {
				coords: { latitude, longitude },
			}: any = await getLocationService({
				watch: false,
				enableHighAccuracy: true,
			} as any);
			if (longitude && latitude) {
				filterDispatcher({
					type: "SET_COORDINATES",
					payload: [longitude, latitude],
				});
			}
		})();
	}, []);

	return (
		<div className="p-2 bg-default rounded">
			<h1 className="text-2xl text-default-inverted">New Location</h1>
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
							<p className="text-default-inverted text-sm mb-2">
								Drag marker to select the place
							</p>
							{filterState?.coordinates[0] && filterState?.coordinates[1] ? (
								<DraggableMapInput
									activeCoordinates={filterState.coordinates}
									onChange={({ lng, lat }: any) => {
										setFieldValue("coordinates.longitude", lng);
										setFieldValue("coordinates.latitude", lat);
									}}
								/>
							) : (
								<div className="text-default bg-warning rounded p-2">
									Unable to load map, To use location selection feature, You
									have to give site permission to access your Geo Location. Or
									you manually enter location coordinate down below.
								</div>
							)}
						</div>

						<div className="my-4">
							<div className="flex">
								<FromikInput
									disabled
									value={values.coordinates.latitude}
									placeholder="Latitude"
									type="text"
								/>
								<div className="w-6" />
								<FromikInput
									disabled
									value={values.coordinates.longitude}
									placeholder="Longitude"
									type="text"
								/>
							</div>
							<div className="flex flex-col">
								<InputError name="coordinates.longitude" />
								<InputError name="coordinates.latitude" />
							</div>
						</div>

						<div className="my-4">
							{/* <FromikInput
								placeholder="Image URI"
								type="text"
								name="cover"
								onChange={handleChange}
								onBlur={handleBlur}
							/> */}
							<ImageUpload
								size="1080x0"
								blur={0}
								onUploadSuccess={(image) => {
									console.log(image);
									setFieldValue("cover", image.src);
								}}
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
								className="p-2 bg-green-500 w-full text-default rounded-full focus:outline-none"
								type="submit"
								disabled={isSubmitting}
							>
								Publish
							</button>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default AddHood;

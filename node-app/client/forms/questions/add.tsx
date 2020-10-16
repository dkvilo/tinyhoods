import React, { useContext, useEffect } from "react";
import { Formik } from "formik";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { isEmpty } from "ramda";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as Yup from "yup";

import Textarea from "../../components/Textarea";

import {
	UserTokenContext,
	GQLErrorContext,
	LoaderProgressContext,
	FiltersContext,
	AlertMessageContext,
} from "../../context";
import InputError from "../../components/InputError";
import { useDropToggleState } from "../../hooks";
import Button from "../../components/Button";

const CREATE_QUESTION = gql`
	mutation createQuestion($data: QuestionInputData!) {
		createQuestion(data: $data)
	}
`;

const GET_LOCATIONS = gql`
	query getLocations($data: GetLocationInputData!) {
		getLocations(data: $data) {
			id
			name
			address
			explorer {
				username
				name
			}
		}
	}
`;

const animatedComponents = makeAnimated();

const AddQuestion = () => {
	const [createQuestion, { loading, error, data }] = useMutation(
		CREATE_QUESTION
	);

	const { state: loginState } = useContext<any>(UserTokenContext);
	const { state: filtersState, dispatch: filterDispatcher } = useContext<any>(
		FiltersContext
	);

	const {
		loading: locationLoading,
		error: locationError,
		data: locationData,
	} = useQuery(GET_LOCATIONS, {
		variables: {
			data: {
				coordinates: !isEmpty(filtersState.coordinates)
					? filtersState.coordinates
					: [],
				maxDistance: parseFloat(filtersState.maxDistance) * 1000,
				token: loginState.token,
			},
		},
	});

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
		if (!loading && !error && data?.createQuestion) {
			messageDispatcher({
				type: "SET_MESSAGE",
				payload: {
					title: "Question",
					message: "The Question was added successfully",
				},
			});
		}
	}, [data, loading, error]);

	const [editLocation, updateEditLocation] = useDropToggleState(false);

	const isLocationResponseReady = (): boolean =>
		!locationLoading && !locationError && !isEmpty(locationData?.getLocations);

	return (
		<div>
			<Formik
				initialValues={{
					isPublished: true,
					location: isLocationResponseReady()
						? locationData.getLocations[0].id
						: "",
					suggestedLocationName: "",
					content: "",
				}}
				validationSchema={Yup.object().shape({
					content: Yup.string().required("Question Content is Required!"),
					location: Yup.string().required("Location is Required!"),
				})}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						setSubmitting(true);
						const { suggestedLocationName, ...requestData } = values;
						const response = await createQuestion({
							variables: {
								data: {
									...requestData,
									token: loginState.token,
								},
							},
						});
						resetForm();
					} catch {}
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
				}) => (
					<form onSubmit={handleSubmit}>
						<div className="my-4">
							<Textarea
								placeholder="Aks or share opinion"
								name="content"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<InputError name="content" />
						</div>

						<div
							className={`flex items-center justify-between bg-primary p-2 ${
								values.suggestedLocationName ? "rounded-t" : "rounded"
							}`}
						>
							<div className="flex flex-col">
								<Button type="button" onClick={updateEditLocation}>
									Choose Location
								</Button>
								<InputError name="location" />
							</div>

							<Button
								type="button"
								onClick={() => {
									if (editLocation) updateEditLocation();
									setFieldValue(
										"location",
										isLocationResponseReady()
											? locationData.getLocations[0].id
											: ""
									);
									setFieldValue(
										"suggestedLocationName",
										isLocationResponseReady()
											? locationData.getLocations[0].name
											: ""
									);
								}}
							>
								Nearest
							</Button>
						</div>

						{values.suggestedLocationName && (
							<div className="flex items-center p-2 bg-secondary text-primary text-sm rounded-b">
								<svg
									className="w-3 h-3 mr-1"
									version="1.1"
									id="Capa_1"
									x="0px"
									y="0px"
									viewBox="0 0 425.963 425.963"
								>
									<path
										d="M213.285,0h-0.608C139.114,0,79.268,59.826,79.268,133.361c0,48.202,21.952,111.817,65.246,189.081   c32.098,57.281,64.646,101.152,64.972,101.588c0.906,1.217,2.334,1.934,3.847,1.934c0.043,0,0.087,0,0.13-0.002   c1.561-0.043,3.002-0.842,3.868-2.143c0.321-0.486,32.637-49.287,64.517-108.976c43.03-80.563,64.848-141.624,64.848-181.482   C346.693,59.825,286.846,0,213.285,0z M274.865,136.62c0,34.124-27.761,61.884-61.885,61.884   c-34.123,0-61.884-27.761-61.884-61.884s27.761-61.884,61.884-61.884C247.104,74.736,274.865,102.497,274.865,136.62z"
										className="active-path"
										fill="var(--color-primary)"
									/>
								</svg>
								{values.suggestedLocationName}
							</div>
						)}

						{editLocation && (
							<>
								<div className="">
									<Select
										placeholder="Attach Location"
										onChange={(selectedItem: any) => {
											const { value, label } = selectedItem;
											setFieldValue("location", value);
											setFieldValue("suggestedLocationName", label);
											if (editLocation) updateEditLocation();
										}}
										closeMenuOnSelect={false}
										components={animatedComponents}
										noOptionsMessage={() => "No Nearby Locations"}
										isMulti={false}
										options={
											isLocationResponseReady()
												? locationData.getLocations.map((each: any) => ({
														value: each.id,
														label: each.name,
												  }))
												: []
										}
										defaultValue={
											isLocationResponseReady()
												? {
														value: locationData.getLocations[0].id,
														label: locationData.getLocations[0].name,
												  }
												: null
										}
									/>
									<div className="mt-2">
										<InputError name="location" />
									</div>
								</div>
							</>
						)}

						{values.content.length >= 3 && (
							<div className="flex justify-center pt-2">
								<button
									className="absolute bottom-0 text-2xl bg-primary w-full p-2 text-default rounded-full"
									type="submit"
									disabled={isSubmitting}
								>
									Post
								</button>
							</div>
						)}
					</form>
				)}
			</Formik>
		</div>
	);
};

export default AddQuestion;

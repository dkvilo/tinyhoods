import React, { useContext, useEffect } from "react";
import { Formik } from "formik";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "@apollo/react-hooks";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import * as Yup from "yup";

import Textarea from "../../components/Textarea";

import {
	UserTokenContext,
	GQLErrorContext,
	LoaderProgressContext,
} from "../../context";
import InputError from "../../components/InputError";
import InputSwitch from "../../components/InputSwitch";

const CREATE_QUESTION = gql`
	mutation createQuestion($data: QuestionInputData!) {
		createQuestion(data: $data)
	}
`;

const GET_LOCATIONS = gql`
	{
		getLocations {
			name
			id
			address
			description
			cover
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

	const {
		loading: locationLoading,
		error: locationError,
		data: locationData,
	} = useQuery(GET_LOCATIONS);

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

	return (
		<div>
			<Formik
				initialValues={{
					isPublished: true,
					location: "",
					content: "",
				}}
				validationSchema={Yup.object().shape({
					content: Yup.string().required("Question Content is Required!"),
					location: Yup.string().required("Location is Required!"),
				})}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						setSubmitting(true);
						const response = await createQuestion({
							variables: {
								data: {
									...values,
									token: loginState.token,
								},
							},
						});
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
				}) => (
					<form onSubmit={handleSubmit}>
						<div className="my-4">
							{!loading && !error && data?.createQuestion && (
								<div className="bg-secondary p-2 rounded-md text-default-inverted">
									Question{" "}
									{values.isPublished
										? "was added Successfully"
										: "was saved as Draft"}
								</div>
							)}
						</div>
						<div className="my-4">
							<Textarea
								placeholder="Aks or share opinion"
								name="content"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<InputError name="content" />
						</div>

						<div className="my-4">
							<Select
								placeholder="Attach Location"
								onChange={(selectedItem: any) => {
									const { value } = selectedItem;
									setFieldValue("location", value);
								}}
								closeMenuOnSelect
								components={animatedComponents}
								isMulti={false}
								options={
									!locationLoading &&
									!locationError &&
									locationData.getLocations.map((each: any) => ({
										value: each.id,
										label: each.name,
									}))
								}
							/>
							<div className="mt-2">
								<InputError name="location" />
							</div>
						</div>

						<div className="my-6 flex">
							<InputSwitch name="isPublished" />
							<span className="block text-primary ml-2">
								{values.isPublished ? "Publish Question" : "Save as a Draft"}
							</span>
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

export default AddQuestion;

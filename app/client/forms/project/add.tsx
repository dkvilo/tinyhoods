import React, { useEffect, useContext } from "react";
import { Formik } from "formik";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";

import Textarea from "../../components/Textarea";
import FromikInput from "../../components/FormikInput";

import InputError from "../../components/InputError";

import {
	LoaderProgressContext,
	GQLErrorContext,
	UserTokenContext,
	AlertMessageContext,
} from "../../context";

import ImageUpload from "../../components/ImageUpload";
import ActionButton from "../../components/ActionButton";

const CREATE_LOCATION = gql`
	mutation createLocation($data: LocationDataInput!) {
		createLocation(data: $data)
	}
`;

const AddProject = () => {
	const [createLocation, { loading, error, data }] = useMutation(
		CREATE_LOCATION
	);

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
					title: "Project",
					message: "Created successfully",
				},
			});
		}
	}, [data, loading, error]);

	return (
		<div className="p-2 bg-default rounded">
			<h1 className="text-2xl text-default-inverted">New Project</h1>
			<Formik
				initialValues={{
					name: "",
					description: "",
					images: [],
					address: "",
					isPrivate: false,
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string().required("Name is required!"),
					images: Yup.array(
						Yup.object({
							src: Yup.string(),
							index: Yup.number(),
						})
					).required("At Least one Image is required"),
					description: Yup.string().required("Description is required!"),
				})}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						setSubmitting(true);
						const response = await createLocation({
							variables: {
								data: {
									...values,
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
								placeholder="Project Name"
								type="text"
								name="name"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<InputError name="name" />
						</div>

						<div className="my-4">
							<Textarea
								placeholder="Describe Your Project"
								name="description"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<InputError name="description" />
						</div>

						<div className="my-4">
							<ImageUpload
								size="1080x0"
								blur={0}
								onUploadSuccess={(image) => {
									let images: any = values.images;
									images.push(image);
									setFieldValue("images", images);
								}}
							/>
							<p className="mt-2 text-default-inverted text-xs">
								Note: First image will be used as a public avatar for the
								project
							</p>
							<InputError name="images" />
						</div>

						<div className="flex justify-center pt-2">
							<ActionButton
								text="Create Project"
								type="submit"
								disabled={isSubmitting}
							/>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default AddProject;

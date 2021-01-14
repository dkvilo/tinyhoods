import React, { useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import FormikInput from "../../components/FormikInput";
import InputError from "../../components/InputError";

import {
	GQLErrorContext,
	LoaderProgressContext,
	AlertMessageContext,
} from "../../context";
import ActionButton from "../../components/ActionButton";

const Registration = () => {
	const REGISTER_USER = gql`
		mutation createUser($data: UserCreateInput!) {
			createUser(data: $data)
		}
	`;

	const [createUser, { loading, error, data }] = useMutation(REGISTER_USER);

	const { dispatch: errorDispatcher } = useContext<any>(GQLErrorContext);

	useEffect(() => {
		if (error) {
			errorDispatcher({
				type: "SET_ERROR",
				payload: {
					title: "User Registration",
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
		if (!loading && !error && data?.createUser) {
			messageDispatcher({
				type: "SET_MESSAGE",
				payload: {
					title: "Registration",
					message: "Registration was successful",
				},
			});
		}
	}, [data, loading, error]);

	return (
		<div>
			<Formik
				initialValues={{
					username: "",
					email: "",
					password: "",
					name: "",
					accept: false,
				}}
				validationSchema={Yup.object().shape({
					username: Yup.string().required("Username is required!"),
					password: Yup.string().required("Password is required!"),
					name: Yup.string().required("Name is required!"),
					email: Yup.string().required("Email is required!"),
				})}
				onSubmit={async (values: any, { setSubmitting, resetForm }: any) => {
					try {
						await createUser({
							variables: {
								data: {
									name: values.name,
									username: values.username,
									password: values.password,
									email: values.email,
								},
							},
						});
						resetForm();
					} catch (e) {}
					setSubmitting(false);
				}}
			>
				{({ isSubmitting }: any) => (
					<Form>
						<div className="flex flex-col mb-4">
							<FormikInput type="text" placeholder="Full Name" name="name" />
							<InputError name={"name"} />
						</div>
						<div className="flex flex-col mb-4">
							<FormikInput type="text" placeholder="Username" name="username" />
							<InputError name={"username"} />
						</div>
						<div className="flex flex-col mb-4">
							<FormikInput
								type="email"
								placeholder="Email Address"
								name="email"
							/>
							<InputError name={"email"} />
						</div>
						<div className="flex flex-col mb-4">
							<FormikInput
								type="password"
								placeholder="Password"
								name="password"
							/>
							<InputError name={"password"} />
						</div>

						<div className="flex flex-col">
							<div className="flex justify-center">
								<ActionButton
									text="Sign Up"
									type="submit"
									disabled={isSubmitting}
								/>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default Registration;

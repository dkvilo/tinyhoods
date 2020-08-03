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
		<>
			<Formik
				initialValues={{
					username: "",
					email: "",
					password: "",
					name: "",
					accept: false,
				}}
				validationSchema={Yup.object().shape({
					username: Yup.string().required("Username is Required!"),
					password: Yup.string().required("Password is Required!"),
					email: Yup.string().required("Email is Required!"),
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
						</div>
						<div className="flex flex-col mb-4">
							<FormikInput
								type="text"
								placeholder="Twitter Username"
								name="username"
							/>
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
								<button
									className="bg-primary w-full p-2 text-default rounded-full mr-2"
									type="submit"
									disabled={isSubmitting}
								>
									Create An Account
								</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Registration;

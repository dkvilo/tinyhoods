import React, { useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import FromikInput from "../../components/FormikInput";
import Button from "../../components/Button";
import InputError from "../../components/InputError";

import {
	UserTokenContext,
	GQLErrorContext,
	LoaderProgressContext,
} from "../../context";
import ActionButton from "../../components/ActionButton";

const Authentication = () => {
	const AUTHENTICATE_USER = gql`
		mutation authenticateUser($data: UserLoginInput!) {
			authenticateUser(data: $data) {
				token
			}
		}
	`;

	const { dispatch } = useContext<any>(UserTokenContext);

	const [authenticateUser, { loading, error, data }] = useMutation(
		AUTHENTICATE_USER
	);

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

	useEffect(() => {
		if (data?.authenticateUser?.token) {
			dispatch({
				type: "SET_TOKEN",
				payload: {
					token: data?.authenticateUser?.token,
				},
			});
		}
	}, [data, dispatch]);

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
					email: "",
					password: "",
				}}
				validationSchema={Yup.object().shape({
					password: Yup.string().required("Password is Required!"),
					email: Yup.string().required("Email is Required!"),
				})}
				onSubmit={async (values: any, { setSubmitting }: any) => {
					try {
						await authenticateUser({
							variables: {
								data: {
									password: values.password,
									email: values.email,
								},
							},
						});
					} catch (e) {}
					setSubmitting(false);
				}}
			>
				{({ isSubmitting }: any) => (
					<Form>
						<div className="flex flex-col mb-4">
							<FromikInput
								type="email"
								placeholder="Email Address"
								name="email"
							/>
							<InputError name={"email"} />
						</div>

						<div className="flex flex-col mb-4">
							<FromikInput
								type="password"
								placeholder="Password"
								name="password"
							/>
							<InputError name={"password"} />
						</div>

						<div className="flex flex-col">
							<div className="flex justify-center">
								<ActionButton
									text="Sign in"
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

export default Authentication;

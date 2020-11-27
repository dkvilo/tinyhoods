import React, { useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import * as Yup from "yup";

import {
	GQLErrorContext,
	UserTokenContext,
	AlertMessageContext,
} from "../../context";
import InputSwitch from "../../components/InputSwitch";

interface IProps {
	isPrivate: boolean;
}

const AccountPrivacy = ({ isPrivate }: IProps) => {
	const UPDATE_USER_ACCOUNT_PRIVACY = gql`
		mutation updateAccountPrivacy($data: UserAccountPrivacyInput!) {
			updateAccountPrivacy(data: $data)
		}
	`;

	const [updateUser, { error, data, loading }] = useMutation(
		UPDATE_USER_ACCOUNT_PRIVACY
	);

	const { dispatch: errorDispatcher } = useContext<any>(GQLErrorContext);
	const { state: tokenState } = useContext<any>(UserTokenContext);

	useEffect(() => {
		if (error) {
			errorDispatcher({
				type: "SET_ERROR",
				payload: {
					title: "Account Privacy",
					error: error,
				},
			});
		}
	}, [error, errorDispatcher]);

	const submitHandler = async (values: any) => {
		try {
			await updateUser({
				variables: {
					data: {
						isPrivate: values.isPrivate,
						token: tokenState.token,
					},
				},
			});
		} catch (e) {}
	};

	const { dispatch: messageDispatcher } = useContext<any>(AlertMessageContext);

	useEffect(() => {
		if (!loading && !error && data?.updateAccountPrivacy) {
			messageDispatcher({
				type: "SET_MESSAGE",
				payload: {
					title: "Account Privacy",
					message: "Privacy was updated successful",
				},
			});
		}
	}, [data, loading, error]);

	return (
		<>
			<Formik
				onSubmit={() => {}}
				initialValues={{
					isPrivate,
				}}
				initialTouched={{
					isPrivate,
				}}
				validationSchema={Yup.object().shape({
					isPrivate: Yup.bool().required(),
				})}
			>
				{({ isSubmitting, setSubmitting, values, touched }: any) => (
					<Form className="py-2 w-full rounded-md">
						<div className="flex justify-between">
							<span className="block text-sm text-default-inverted">
								Make My Account Private
							</span>
							<InputSwitch
								name="isPrivate"
								onSave={(value: boolean) => {
									submitHandler({ isPrivate: !value });
									setSubmitting(false);
								}}
							/>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default AccountPrivacy;

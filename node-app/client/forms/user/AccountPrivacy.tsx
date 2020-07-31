import React, { useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import * as Yup from "yup";

import CheckBox from "../../components/CheckBox";
import Alert from "../../components/ErrorAlert";
import InputError from "../../components/InputError";
import { GQLErrorContext, UserTokenContext } from "../../context";
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

	const [updateUser, { error, data }] = useMutation(
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
					<Form className="p-2 bg-secondary w-full rounded-md">
						{data?.updateAccountPrivacy && (
							<Alert
								title="Account Privacy"
								message={"Privacy was updated successful"}
							/>
						)}

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

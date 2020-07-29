import React, { useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import * as Yup from "yup";

import CheckBox from "../../components/CheckBox";
import Alert from "../../components/ErrorAlert";
import InputError from "../../components/InputError";
import { GQLErrorContext, UserTokenContext } from "../../context";

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

	return (
		<>
			<Formik
				initialValues={{
					isPrivate,
				}}
				initialTouched={{
					isPrivate: false,
				}}
				validationSchema={Yup.object().shape({
					isPrivate: Yup.bool().required(),
				})}
				onSubmit={async (values: any, { setSubmitting }: any) => {
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
					setSubmitting(false);
				}}
			>
				{({ isSubmitting, values, touched }: any) => (
					<Form>
						{data?.updateAccountPrivacy && (
							<Alert
								title="Account Privacy"
								message={"Privacy was updated successful"}
							/>
						)}

						<div className="flex flex-col mb-4">
							<CheckBox name="isPrivate" text="Make My Account Private" />
							<InputError name={"isPrivate"} />
						</div>

						<div className="flex">
							<div className="flex justify-start">
								<button
									className="px-3 text-default-inverted bg-default hover:bg-primary hover:text-default w-full py-1 rounded-md mr-2"
									type="submit"
									disabled={isSubmitting}
								>
									Update
								</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default AccountPrivacy;

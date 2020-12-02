import React, { useContext, useEffect } from "react";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";

import {
	UserTokenContext,
	GQLErrorContext,
	LoaderProgressContext,
	AlertMessageContext,
} from "../../context";

import Textarea from "../../components/Textarea";

import { CREATE_COMMENT } from "./query";
import { IProps } from "./types";

const AddComment = ({ postId, onSuccess }: IProps) => {
	const [createComment, { loading, error, data }] = useMutation(CREATE_COMMENT);

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
		if (!loading && !error && data?.createComment) {
			messageDispatcher({
				type: "SET_MESSAGE",
				payload: {
					title: "Comment",
					message: "The Comment was added successfully",
				},
			});
		}
	}, [data, loading, error]);

	return (
		<div>
			<Formik
				initialValues={{
					content: "",
				}}
				validationSchema={Yup.object().shape({
					content: Yup.string().required("Comment cant be empty"),
				})}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						setSubmitting(true);
						const response = await createComment({
							variables: {
								data: {
									...values,
									postId,
									token: loginState.token,
								},
							},
						});

						if (response.data?.createComment) onSuccess();
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
						<div className="flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row bg-secondary rounded-md">
							<Textarea
								rows={1}
								placeholder="Write a comment ..."
								name="content"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{!!errors && values.content.length >= 1 && (
								<div className="flex p-2">
									<button
										className="focus:outline-none bg-green-500 px-5 py-1 text-default rounded-md w-full"
										type="submit"
										disabled={isSubmitting}
									>
										Comment
									</button>
								</div>
							)}
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default AddComment;

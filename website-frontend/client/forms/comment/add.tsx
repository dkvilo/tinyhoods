import React, { useContext, useEffect } from "react";
import { isEmpty } from "ramda";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";

import {
	UserTokenContext,
	GQLErrorContext,
	LoaderProgressContext,
} from "../../context";

import Textarea from "../../components/Textarea";

import { CREATE_COMMENT } from "./query";
import { IProps } from "./types";

import Button from "../../components/Button";
import { useDropToggleState } from "../../hooks";
import Modal from "../../components/Modal";
import AuthCard from "../../components/AuthCard";

const AddComment = ({ postId, onSuccess, onReply }: IProps) => {
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

	const alertController = useDropToggleState(!loginState.isLogin);

	return (
		<div>
			<Modal controller={alertController} title="">
				<AuthCard />
			</Modal>
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
									documentId:
										onReply && !isEmpty(onReply) ? onReply.id : postId,
									target: onReply && !isEmpty(onReply) ? "comments" : "posts",
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
					resetForm,
				}) => (
					<form onSubmit={handleSubmit}>
						{onReply && !isEmpty(onReply) && (
							<div className="flex items-center justify-between">
								<h1 className="py-1 text-default-inverted">
									Replying on{" "}
									<span className="font-bold">{onReply.author.username}</span>'s
									Comment
								</h1>
								<Button
									type="button"
									onClick={() => {
										resetForm();
										onReply = null as any;
									}}
								>
									<span className="text-red-400 underline">Cancel</span>
								</Button>
							</div>
						)}
						<div className="flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row bg-secondary rounded-md">
							<Textarea
								rows={1}
								placeholder="Write a comment ..."
								name="content"
								onClick={() => {
									if (!loginState.isLogin) {
										alertController[1]() as any;
									}
								}}
								disabled={!loginState.isLogin}
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
										{onReply && !isEmpty(onReply) ? "Reply" : "Comment"}
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

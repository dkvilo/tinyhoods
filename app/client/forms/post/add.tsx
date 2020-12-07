import React, { useContext, useEffect } from "react";
import { Formik } from "formik";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import Textarea from "../../components/Textarea";

import {
	GQLErrorContext,
	LoaderProgressContext,
	AlertMessageContext,
	UserTokenContext,
} from "../../context";

import ImageUpload from "../../components/ImageUpload";

const CREATE_POST = gql`
	mutation createPost($data: CreatePostInput!) {
		createPost(data: $data)
	}
`;

const AddPost = ({ onSuccess }: { onSuccess(): void }) => {
	const { state: loginState } = useContext<any>(UserTokenContext);
	const [createPost, { loading, error, data }] = useMutation(CREATE_POST);

	const { dispatch: errorDispatcher } = useContext<any>(GQLErrorContext);
	useEffect(() => {
		if (error) {
			errorDispatcher({
				type: "SET_ERROR",
				payload: {
					title: "Create Post",
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

	return (
		<div className="p-2 bg-default mt-2 rounded">
			<h1 className="text-2xl text-default-inverted">New Post</h1>
			<Formik
				initialValues={{
					isPublished: true,
					content: "",
					images: [],
				}}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						setSubmitting(true);
						const response = await createPost({
							variables: {
								data: {
									...values,
									token: loginState.token,
								},
							},
						});

						if (response?.data.createPost) {
							onSuccess();
							resetForm();
							messageDispatcher({
								type: "SET_MESSAGE",
								payload: {
									title: "Post",
									message: "The Post was Created successfully",
								},
							});
						}
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
						<div className="my-2">
							<Textarea
								placeholder="What's Happening?"
								name="content"
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<ImageUpload
								onUploadSuccess={(image) => {
									(values.images as any).push(image);
								}}
								size="1080x1080"
								blur={0}
							/>
							<div className="flex justify-center mt-3">
								<button
									className="p-2 text-lg bg-green-500 w-full text-default  rounded-full"
									disabled={isSubmitting}
								>
									Publish
								</button>
							</div>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default AddPost;

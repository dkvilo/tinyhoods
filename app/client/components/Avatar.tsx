import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
	UserTokenContext,
	GQLErrorContext,
	AlertMessageContext,
} from "../context";

const UPDATE_USER_AVATAR = gql`
	mutation updateAvatar($data: UserAvatarInput!) {
		updateAvatar(data: $data)
	}
`;

export default function Avatar({
	src,
	username,
}: {
	src: string;
	username: string;
}): JSX.Element {
	const { state: loginState } = useContext(UserTokenContext);
	const { dispatch: errorDispatcher } = useContext<any>(GQLErrorContext);

	const [file, setFile] = useState<any>({});
	const [status, setStatus] = useState<boolean>(false);

	const [updateUserAvatar, { loading, data, error }] = useMutation(
		UPDATE_USER_AVATAR
	);

	useEffect(() => {
		if (error) {
			errorDispatcher({
				type: "SET_ERROR",
				payload: {
					title: "Image Upload",
					error: error,
				},
			});
		}
	}, [error, errorDispatcher]);

	const { dispatch: messageDispatcher } = useContext<any>(AlertMessageContext);
	useEffect(() => {
		if (!loading && !error && data?.updateAvatar) {
			messageDispatcher({
				type: "SET_MESSAGE",
				payload: {
					title: "Profile Picture",
					message: "Profile Picture uploaded successful",
				},
			});
		}
	}, [data, loading, error]);

	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/*",
		onDrop: async ([image]: any) => {
			setStatus(true);
			if (image) {
				setFile(
					Object.assign(image, {
						preview: URL.createObjectURL(image),
					})
				);
			}
		},
	});

	useEffect(() => {
		return () => URL.revokeObjectURL(file.preview);
	}, [file]);

	const handleUpload = async () => {
		if (file) {
			const formdata = new FormData();
			formdata.append("image", file);
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_ENDPOINT}?accessToken=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_SECRET}&size=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_AVATAR_SIZE}&type=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_AVATAR_CROP_TYPE}`,
					{
						mode: "no-cors",
						method: "POST",
						body: formdata,
					}
				);
				const data = await response.json();
				if (data?.success) {
					(await updateUserAvatar({
						variables: {
							data: {
								token: loginState.token,
								avatar: data?.data?.path,
							},
						},
					})) as any;

					setStatus(false);
					setFile(
						Object.assign(
							{},
							{
								preview: `/imcargo/${data?.data?.path}`,
							}
						)
					);
				}
			} catch (e) {
				console.log("error", e);
				messageDispatcher({
					type: "SET_MESSAGE",
					payload: {
						title: "Image Upload Issue",
						message: "Unfortunately we are not able to process the image",
					},
				});
			}
		} else {
			console.log("No files to upload");
		}
	};

	return (
		<>
			<label className="cursor-pointer">
				<div className="flex items-center w-20 h-20 rounded-full border-default-inverted overflow-hidden">
					<img
						src={file?.preview ? file?.preview : src}
						alt={username}
						className="w-20 h-20"
						style={{
							height: 80,
							width: 80,
						}}
					/>
					<div {...getRootProps({ className: "dropzone" })}>
						<input {...getInputProps()} />
					</div>
				</div>
			</label>
			{status && (
				<div className="my-2">
					<button
						type="button"
						onClick={handleUpload}
						className="p-1 bg-primary text-xs text-default w-16 rounded-l-md"
					>
						Upload
					</button>
					<button
						type="button"
						onClick={() => {
							setFile({});
							setStatus(false);
						}}
						className="p-1 bg-default-inverted text-xs text-default w-16 rounded-r-md"
					>
						Remove
					</button>
				</div>
			)}
		</>
	);
}

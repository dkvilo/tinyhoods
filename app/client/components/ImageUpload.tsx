import React, { useContext, useReducer } from "react";
import { useDropzone } from "react-dropzone";

import { AlertMessageContext } from "../context";

function reducer(defaultState: any, action: any) {
	switch (action.type) {
		case "ADD_IMAGE":
			return [
				...defaultState,
				{
					file: action.payload.file,
					src: action.payload.src,
					hideControls: false,
				},
			];
		case "REMOVE_IMAGE":
			// revoke
			URL.revokeObjectURL(defaultState[action.payload.index].src);
			return [
				...defaultState.filter(
					(_: any, index: number) => index != action.payload.index
				),
			];
		case "TOGGLE_CONTROLS":
			return [
				...defaultState.map((each: any, index: number) => {
					if (index === action.payload.index) {
						return {
							...each,
							hideControls: action.payload.hideControls,
						};
					}
					return each;
				}),
			];
		case "UPLOAD_SUCCESS":
			return [
				...defaultState.map((each: any, index: number) => {
					if (index === action.payload.index) {
						return {
							...each,
							src: action.payload.src,
						};
					}
					return each;
				}),
			];
		default:
			return defaultState;
	}
}

export default function ImageUpload({
	size,
	blur,
	onUploadSuccess,
}: {
	size: string;
	blur: number;
	onUploadSuccess(images: { src: string; index: number }): void;
}): JSX.Element {
	const [images, imageDispatcher] = useReducer(reducer, []);
	const { dispatch: messageDispatcher } = useContext<any>(AlertMessageContext);

	const { getRootProps, getInputProps } = useDropzone({
		accept: "image/*",
		multiple: true,
		onDrop: async (files: File[]) => {
			if (files) {
				for (let i = 0; i < files.length; i++) {
					if (i === 4) break;
					imageDispatcher({
						type: "ADD_IMAGE",
						payload: { file: files[i], src: URL.createObjectURL(files[i]) },
					});
				}
			}
		},
	});

	const handleUpload = (index: number) => async () => {
		if (images[index]) {
			imageDispatcher({
				type: "TOGGLE_CONTROLS",
				payload: {
					index,
					hideControls: true,
				},
			});
			const formdata = new FormData();
			formdata.append("image", images[index].file);
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_ENDPOINT}?accessToken=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_SECRET}&size=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_POSTER_SIZE}`,
					{
						mode: "no-cors",
						method: "POST",
						body: formdata,
					}
				);
				const { data, success } = await response.json();
				if (success) {
					imageDispatcher({
						type: "UPLOAD_SUCCESS",
						payload: {
							index,
							src: `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${data.path}`,
						},
					});

					onUploadSuccess({
						index,
						src: `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${data.path}`,
					});
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
				imageDispatcher({
					type: "TOGGLE_CONTROLS",
					payload: {
						index,
						hideControls: false,
					},
				});
			}
		} else {
			console.log("No files to upload");
		}
	};

	return (
		<div className="flex overflow-x-scroll">
			{images.map((image: any, index: number) => (
				<div key={index} className="mr-1">
					{image.src && (
						<div className="flex items-center w-32 h-32 rounded overflow-hidden">
							<img
								src={image.src}
								alt={"Image"}
								className="w-32 h-32 object-cover"
							/>
						</div>
					)}
					{!image.hideControls && (
						<div className="my-2">
							<button
								type="button"
								onClick={handleUpload(index)}
								className="p-1 bg-primary text-xs text-default w-16 rounded-l-md"
							>
								Upload
							</button>
							<button
								type="button"
								onClick={() => {
									imageDispatcher({
										type: "REMOVE_IMAGE",
										payload: { index },
									});
								}}
								className="p-1 bg-default-inverted text-xs text-default w-16 rounded-r-md"
							>
								Remove
							</button>
						</div>
					)}
				</div>
			))}

			{images.length <= 3 && (
				<div className="cursor-pointer">
					<div
						{...getRootProps({ className: "dropzone" })}
						className="flex flex-col p-2 bg-secondary border-dashed border-2 border-secondary-soft focus:outline-none hover:bg-default rounded text-default-inverted hover:text-primary h-32 w-32 justify-center items-center"
					>
						<svg
							className="mx-auto feather feather-image"
							xmlns="http://www.w3.org/2000/svg"
							width="60"
							height="60"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
							<circle cx="8.5" cy="8.5" r="1.5"></circle>
							<polyline points="21 15 16 10 5 21"></polyline>
						</svg>
						<input {...getInputProps()} />
					</div>
				</div>
			)}
		</div>
	);
}

export default function PostImageContent({
	images,
	onImageClick,
}: {
	images: any[];
	onImageClick: any;
}): JSX.Element {
	return (
		<figure className="overflow-x-scroll flex flex-1">
			{images.map((each: any, imageIndex: number) => (
				<div key={imageIndex} className="cursor-pointer px-1 ">
					<img
						className="rounded-md shadow-md"
						src={
							process.env.NODE_ENV === "development"
								? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}${each.src}`
								: each.src
						}
						width={1080}
						height={1080}
						onClick={onImageClick({
							post: {
								images,
							},
							imageIndex,
						})}
					/>
				</div>
			))}
		</figure>
	);
}

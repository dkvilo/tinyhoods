import Image from "next/image";
import { useState } from "react";

export default function PostImageContent({
	images,
	onImageClick,
}: {
	images: any[];
	onImageClick: any;
}): JSX.Element {
	const [width, setWidth] = useState<number>(1080);

	return (
		<figure className="flex flex-1">
			{images.map((each: any, imageIndex: number) => (
				<div key={imageIndex} className="cursor-pointer p-1">
					<Image
						unoptimized
						alt="Thumbnail"
						className="rounded-md bg-secondary shadow-md"
						src={
							process.env.NODE_ENV === "development"
								? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}${each.src}`
								: each.src
						}
						objectFit="cover" // scale-down
						loading={"lazy"}
						layout="intrinsic"
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

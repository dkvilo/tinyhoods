import Image from "next/image";
import { normalizeImagePath } from "../../../shared/utils";

export default function PostImageContent({
	images,
	onImageClick,
}: {
	images: any[];
	onImageClick: any;
}): JSX.Element {
	return (
		<figure className="flex flex-1">
			{images.map((each: any, imageIndex: number) => (
				<div key={imageIndex} className="cursor-pointer p-1">
					<Image
						unoptimized
						alt="Thumbnail"
						title="Thumbnail"
						className="rounded-md bg-secondary shadow-md"
						src={normalizeImagePath(each.src)}
						objectFit="scale-down" // scale-down | cover
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

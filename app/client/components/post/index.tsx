import moment from "moment";
import Link from "next/link";

import PostActions from "./PostActions";
import PostFooter from "./PostFooter";
import PostImageContent from "./PostImageContent";
import PostTextContent from "./PostTextContent";

import { IProps } from "./types";

export default function Post({
	author,
	publishedAt,
	content,
	id,
	images,
	onImageClick,
}: IProps): JSX.Element {
	return (
		<div className="mb-4 rounded p-1 hover:bg-secondary">
			<div className="flex items-center rounded-t py-1">
				<figure className="w-10 h-10 flex rounded-full overflow-hidden">
					<img
						src={`${
							process.env.NODE_ENV === "development"
								? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/imcargo`
								: process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME
						}/${author.image}`}
						alt={author.username}
					/>
				</figure>
				<div className="flex flex-1 flex-col">
					<span className="text-default-inverted ml-1 font-bold opacity-75">
						{author.username}
					</span>
					<Link href={`/post/${id}`}>
						<span
							className="text-default-inverted opacity-75 text-xs ml-1 italic relative"
							style={{
								top: -4,
							}}
						>
							{moment(publishedAt).calendar()}
						</span>
					</Link>
				</div>
				<div>
					<button className="p-2 hover:bg-secondary rounded-full focus:outline-none">
						<svg
							className="fill-current h-5 w-5 text-default-inverted"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 23 23"
						>
							<circle cx="12" cy="12" r="2"></circle>
							<circle cx="19" cy="12" r="2"></circle>
							<circle cx="5" cy="12" r="2"></circle>{" "}
						</svg>
					</button>
				</div>
			</div>

			<div className="py-2 rounded-md">
				{content && <PostTextContent content={content} />}
				{images && (
					<PostImageContent images={images} onImageClick={onImageClick} />
				)}
			</div>
			<PostActions />
			<div className="flex flex-col items-start px-2">
				<PostFooter />
			</div>
		</div>
	);
}

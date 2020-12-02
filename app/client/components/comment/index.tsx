import moment from "moment";
import { IProps } from "./types";

export default function Comment({
	content,
	publishedAt,
	author,
	isClickable = false,
}: IProps): JSX.Element {
	return (
		<div
			className={`border-secondary p-1 ${
				isClickable ? "hover:bg-secondary rounded-md" : ""
			} w-full`}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-start">
					<img
						src={`${
							process.env.NODE_ENV === "development"
								? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/imcargo`
								: process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME
						}/${author.image}`}
						alt={author.username}
						className="w-8 h-8 rounded-full bg-secondary-soft"
						style={{
							width: 24,
							height: 24,
						}}
					/>
					<div className="flex flex-col justify-start ml-2">
						<div className="flex">
							<span className="text-default-inverted mb-1">
								{author.username}
							</span>
						</div>
						<p className="px-2 py-2 rounded-b-lg rounded-r-lg border-2 bg-default text-sm text-default-inverted w-auto">
							{content}
						</p>
						<div className="flex items-center text-default-inverted opacity-75 text-xs mt-1">
							<span className="ml-1">
								{moment(publishedAt as any).calendar()}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

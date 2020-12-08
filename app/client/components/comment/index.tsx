import moment from "moment";
import { FormEvent } from "react";
import Button from "../Button";
import { IProps } from "./types";

export default function Comment({
	id,
	content,
	publishedAt,
	author,
	canReply = false,
	isClickable = false,
	onReply,
}: IProps): JSX.Element {
	const ranges = [
		"\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]",
		" ",
	].join("|");

	const removeEmoji = (str: any) => str.replace(new RegExp(ranges, "g"), "");
	const isOnlyEmojis = (str: any) => !removeEmoji(str).length;

	return (
		<div
			className={`border-secondary p-1 ${
				isClickable ? "hover:bg-secondary rounded-md" : ""
			} w-full`}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-start">
					<img
						src={
							process.env.NODE_ENV === "development"
								? author.image
									? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/imcargo/${author.image}`
									: author.avatar
								: author.image
								? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${author.image}`
								: author.avatar
						}
						alt={author.username}
						className="w-8 h-8 rounded-full bg-secondary-soft"
						style={{
							width: 24,
							height: 24,
						}}
					/>
					<div className="flex flex-col justify-start ml-2">
						<div className="flex">
							<span className="text-default-inverted mb-1 font-bold opacity-75">
								{author.username}
							</span>
						</div>
						{isOnlyEmojis(content) && content.length === 2 ? (
							<p className="mx-6 my-2" style={{ transform: "scale(1.5)" }}>
								{content}
							</p>
						) : (
							<p className="px-2 py-2 rounded-b-lg rounded-r-lg border-2 bg-default text-sm text-default-inverted w-auto">
								{content}
							</p>
						)}
						{canReply && (
							<div className="flex m-1">
								<Button
									onClick={
										onReply &&
										(onReply({
											author,
											content,
											id,
										} as any) as any)
									}
									className="focus:outline-none focus:text-red-400 cursor-pointer underline text-default-inverted hover:text-primary"
								>
									Reply
								</Button>
							</div>
						)}
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

import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";

import { UserTokenContext } from "../../context";
import { IProps } from "./types";

import Button from "../Button";

export default function Comment({
	id,
	content,
	publishedAt,
	author,
	canReply = false,
	isClickable = false,
	onReply,
}: IProps): JSX.Element {
	const { state: loginState } = useContext(UserTokenContext);

	const ranges = [
		"\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]",
		" ",
	].join("|");

	const removeEmoji = (str: any) => str.replace(new RegExp(ranges, "g"), "");
	const isOnlyEmojis = (str: any) => !removeEmoji(str).length;

	return (
		<div className={`border-secondary p-1`}>
			<div className="flex items-center justify-between">
				<div className="flex items-start">
					<Link href={`/${author.username}`}>
						<div>
							<Image
								unoptimized
								objectFit="cover"
								src={
									process.env.NODE_ENV === "development"
										? author.image
											? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/imcargo/${author.image}`
											: author.avatar
										: author.image
										? `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVICE_NAME}/${author.image}`
										: author.avatar
								}
								width={24}
								height={24}
								className="cursor-pointer rounded-full bg-secondary-soft"
								alt={author.username}
								title={author.username}
							/>
						</div>
					</Link>

					<div className="flex flex-col justify-start ml-2">
						<div className="flex">
							<Link href={`/${author.username}`}>
								<span className="cursor-pointer text-default-inverted mb-1 font-bold opacity-75">
									{author.username}
								</span>
							</Link>
						</div>
						{isOnlyEmojis(content) && content.length === 2 ? (
							<p className="mx-6 my-2" style={{ transform: "scale(1.5)" }}>
								{content}
							</p>
						) : (
							<p className="px-2 py-2 rounded-b-lg rounded-r-lg border-2 bg-default text-sm text-default-inverted max-w-md">
								{content}
							</p>
						)}
						{loginState.isLogin && canReply && (
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
									className="focus:outline-none focus:text-red-400 cursor-pointer underline text-default-inverted hover:text-primary text-sm"
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

import React from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";

import PostActions from "./PostActions";
import PostFooter from "./PostFooter";
import PostImageContent from "./PostImageContent";
import PostTextContent from "./PostTextContent";
import SettingsPanel from "./SettingsPanel";

import { useDropToggleState } from "../../hooks";
import { IProps } from "./types";
import { getImageOrAvatarPath } from "../../../shared/utils";

export default function Post({
	author,
	publishedAt,
	content,
	recentComment,
	index,
	id,
	likesCount,
	commentsCount,
	_liked,
	_editable,
	images,
	onImageClick,
	onPostShallowClick,
}: IProps): JSX.Element {
	const [isSettingsOpen, toggleIsSettingsState] = useDropToggleState(false);

	return (
		<div className={`p-2 border border-secondary-soft bg-default`}>
			<div className="flex items-center rounded-t py-1">
				<Link href={`/${author.username}`}>
					<div className="cursor-pointer flex rounded-full overflow-hidden">
						<Image
							unoptimized
							objectFit="cover"
							width={40}
							height={40}
							src={getImageOrAvatarPath(author.image, author.avatar)}
							alt={author.username}
							title={author.username}
						/>
					</div>
				</Link>
				<div className="flex flex-1 items-center justify-between">
					<div className="flex flex-col">
						<Link href={`/${author.username}`}>
							<span className="cursor-pointer text-default-inverted ml-1 font-bold opacity-75">
								{author.username}
							</span>
						</Link>
						<Link href={`/post/${id}`}>
							<span
								className="hover:text-primary w-auto hover:underline cursor-pointer text-default-inverted opacity-75 text-xs ml-1 italic relative"
								style={{
									top: -4,
								}}
							>
								{moment(publishedAt).calendar()}
							</span>
						</Link>
					</div>
					<div className="relative">
						<button
							onClick={toggleIsSettingsState}
							className="p-2 hover:bg-secondary rounded-full focus:outline-none"
						>
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
						<CSSTransition
							in={isSettingsOpen as boolean}
							timeout={300}
							classNames="swoop-in"
						>
							<div className="absolute" style={{ right: 5, zIndex: 8888 }}>
								{isSettingsOpen && <SettingsPanel editable={_editable} />}
							</div>
						</CSSTransition>
					</div>
				</div>
			</div>
			<div className="py-1">
				{content && <PostTextContent content={content} />}
				{images && (
					<PostImageContent images={images} onImageClick={onImageClick} />
				)}
			</div>
			<PostActions
				postId={id}
				commentsCount={commentsCount}
				likesCount={likesCount}
				liked={_liked}
				onPostShallowClick={onPostShallowClick}
			/>
			{recentComment && (
				<div className="mb-2">
					<h1 className="px-1 text-default-inverted text-lg font-bold">
						Recent Comment
					</h1>
					<div
						onClick={onPostShallowClick}
						className="flex flex-col items-start px-1 cursor-pointer"
					>
						<PostFooter comments={[recentComment]} />
					</div>
				</div>
			)}
		</div>
	);
}

import moment from "moment";
import Link from "next/link";
import Image from "next/image";

import { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { isEmpty, remove, uniq } from "ramda";

import PostActions from "./PostActions";
import PostFooter from "./PostFooter";
import PostImageContent from "./PostImageContent";
import PostTextContent from "./PostTextContent";
import MoreComments from "../comment/MoreComments";
import AddComment from "../../forms/comment/add";
import Loader from "../Loader";

import { GET_COMMENTS_BY_POST_ID } from "./query";

import { IProps } from "./types";
import { UserTokenContext } from "../../context";
import { getImageOrAvatarPath } from "../../../shared/utils";

export default function Detailed({
	author,
	publishedAt,
	content,
	id,
	images,
	onImageClick,
	likesCount,
	commentsCount,
	_liked,
}: IProps): JSX.Element {
	const { state: loginState } = useContext(UserTokenContext);
	const [commentsPageNumber, setCommentsPageNumber] = useState(1);
	const {
		loading: loadingComments,
		data: commentsData,
		error: commentsError,
		refetch: refetchComments,
	} = useQuery(GET_COMMENTS_BY_POST_ID, {
		variables: {
			id,
			page: commentsPageNumber,
		},
	});

	const handleCommentsPagination = () => {
		if (commentsData.getComments.nextPage) {
			setCommentsPageNumber(commentsData.getComments.nextPage);
			refetchComments({
				id,
				page: commentsData.getComments.nextPage,
			});
		}
	};

	// cache comments in memory
	const [comments, setComments] = useState<[]>([]);
	useEffect(() => {
		if (!loadingComments && !commentsError) {
			setComments(
				(prevComments) =>
					uniq([
						...commentsData.getComments.docs,
						...prevComments,
					] as any) as any
			);
		}
	}, [loadingComments, commentsError, commentsData]);

	const [onCommentReply, setOnCommentReply] = useState<{} | null>(null);
	const handleCommentReply = (comment: any) => {
		setOnCommentReply(comment);
	};

	return (
		<>
			<h1 className="mx-1 text-default-inverted font-bold text-2xl my-2">
				{moment(publishedAt).format("LL [at] HH:MM")}
			</h1>
			<div className="mb-4 rounded p-1 border-2 border-secondary-soft bg-default">
				<div className="flex items-center rounded-t py-1">
					<div className="flex rounded-full overflow-hidden">
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
					<div className="flex flex-1 items-center justify-between">
						<div className="flex flex-col">
							<span className="text-default-inverted ml-1 font-bold opacity-75">
								{author.username}
							</span>
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
				</div>

				<div className="py-2 rounded-md">
					{content && <PostTextContent content={content} />}
					{images && (
						<PostImageContent images={images} onImageClick={() => {}} />
					)}
				</div>

				{loginState.isLogin && (
					<PostActions
						postId={id}
						likesCount={likesCount}
						commentsCount={commentsCount}
						liked={_liked}
						isDetailed
					/>
				)}

				<h1 className="px-1 py-1 text-default-inverted text-lg font-bold">
					Comments
				</h1>
				<div className="px-1 my-2">
					<AddComment
						onReply={onCommentReply as any}
						postId={id as string}
						onSuccess={() => {
							(async () => {
								const { data } = await refetchComments();
								setComments(
									(prevComments: any) =>
										remove(
											-1,
											1,
											uniq([
												...data.getComments.docs,
												...prevComments,
											] as any) as any
										) as any
								);
							})();
						}}
					/>
				</div>
				<div className="flex flex-col items-start px-1">
					{!loadingComments && !commentsError && !isEmpty(comments) && (
						<>
							<PostFooter onReply={handleCommentReply} comments={comments} />
							{commentsData.getComments.nextPage && (
								<div className="p-2 w-full flex items-center">
									<MoreComments
										count={commentsData.getComments.totalDocs - comments.length}
										onClick={handleCommentsPagination}
									/>
								</div>
							)}
						</>
					)}

					{loadingComments && !commentsError && <Loader />}
				</div>
			</div>
		</>
	);
}

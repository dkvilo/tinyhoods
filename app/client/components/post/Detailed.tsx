import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import PostActions from "./PostActions";
import PostFooter from "./PostFooter";
import PostImageContent from "./PostImageContent";
import PostTextContent from "./PostTextContent";
import MoreComments from "../comment/MoreComments";
import AddComment from "../../forms/comment/add";

export const GET_COMMENTS_BY_POST_ID = gql`
	query getComments($id: ID!, $page: Int!) {
		getComments(id: $id, page: $page) {
			docs {
				id
				content
				publishedAt
				author {
					avatar
					username
					image
				}
			}
			nextPage
			pagingCounter
			totalDocs
			totalPages
		}
	}
`;

import { IProps } from "./types";
import { isEmpty } from "ramda";
import Loader from "../Loader";
import { gql } from "apollo-boost";

export default function Detailed({
	author,
	publishedAt,
	content,
	id,
	images,
	onImageClick,
}: IProps): JSX.Element {
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
		if (commentsData.getComments.nextPage)
			refetchComments({
				id,
				page: commentsData.getComments.nextPage,
			});
	};

	// cache posts in memory
	const [comments, setComments] = useState<[]>([]);
	useEffect(() => {
		if (!loadingComments && !commentsError) {
			setComments(
				(prevComments) =>
					[
						...new Set([...prevComments, ...commentsData.getComments.docs]),
					] as any
			);
		}
	}, [loadingComments, commentsError, commentsData]);

	return (
		<>
			<h1 className="text-default-inverted font-bold text-2xl px-1 my-2">
				{moment(publishedAt).format("LL [at] HH:MM")}
			</h1>
			<div className="mb-4 rounded p-1 border-2 bg-default">
				<div className="flex items-center rounded-t py-1">
					<figure className="w-10 h-10 flex rounded-full overflow-hidden">
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
						/>
					</figure>
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

				<div className="py-2 rounded-md">
					{content && <PostTextContent content={content} />}
					{images && (
						<PostImageContent images={images} onImageClick={() => {}} />
					)}
				</div>
				<PostActions isDetailed />
				<h1 className="px-1 py-1 text-default-inverted text-lg font-bold">
					Comments
				</h1>
				<div className="px-1 my-2">
					<AddComment
						postId={id as string}
						onSuccess={() => {
							(async () => {
								const { data } = await refetchComments();
								setComments(
									(prevComments) =>
										[
											...new Set([...data.getComments.docs, ...prevComments]),
										] as any
								);
							})();
						}}
					/>
				</div>
				<div className="flex flex-col items-start px-1">
					{!loadingComments && !commentsError && !isEmpty(comments) && (
						<>
							<PostFooter comments={comments} />
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

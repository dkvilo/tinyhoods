import CommentModel from "../../../models/comment";
import UserModel from "../../../models/users";
import PostModel from "../../../models/posts";

import { requireToken, decryptToken } from "../../../utils";

export default async function createComment(
	parent: any,
	args: any,
	context: any
) {
	const { token, postId, content, isPublished = true } = args.data;

	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		const response = await CommentModel.create({
			...args.data,
			content,
			onModelSelector: postId,
			onModel: "posts",
			isPublished,
			publishedAt: isPublished ? Date.now() : null,
			author: userId,
		});

		const postResponse = await PostModel.findOneAndUpdate(
			{
				_id: postId as any,
			},
			{
				$push: { comments: response._id } as any,
				$set: {
					recentComment: response._id,
				} as any,
			}
		);

		const userResponse = await UserModel.findOneAndUpdate(
			{
				_id: userId,
			},
			{
				$push: { comments: response._id } as any,
			}
		);

		return !!response && !!userResponse && !!postResponse;
	} catch (e) {
		throw new Error(e.message);
	}
}

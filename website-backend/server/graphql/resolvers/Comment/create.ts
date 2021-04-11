import CommentModel from "../../../models/comment";
import UserModel from "../../../models/users";
import PostModel from "../../../models/posts";

import {
	requireToken,
	decryptToken,
	checkForDeactivatedUser,
} from "../../../utils";

export default async function createComment(
	parent: any,
	args: any,
	context: any
) {
	const { token, documentId, target, content, isPublished = true } = args.data;

	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		const { isDeactivated, message } = await checkForDeactivatedUser(userId);
		if (isDeactivated) throw new Error(message);

		const response = await CommentModel.create({
			...args.data,
			content,
			onModelSelector: documentId,
			onModel: target,
			isPublished,
			publishedAt: isPublished ? Date.now() : null,
			author: userId,
		});

		let targetModifiedResponse;

		if (target === "posts") {
			targetModifiedResponse = await PostModel.findOneAndUpdate(
				{
					_id: documentId as any,
				},
				{
					$push: { comments: response._id } as any,
					$set: {
						recentComment: response._id,
					} as any,
				}
			);
		} else {
			targetModifiedResponse = await CommentModel.findOneAndUpdate(
				{
					_id: documentId as any,
				},
				{
					$push: { replies: response._id } as any,
					$set: {
						recentReplies: response._id,
					} as any,
				}
			);
		}

		const userResponse = await UserModel.findOneAndUpdate(
			{
				_id: userId,
			},
			{
				$push: { comments: response._id } as any,
			}
		);

		return !!response && !!userResponse && !!targetModifiedResponse;
	} catch (e) {
		throw new Error(e.message);
	}
}

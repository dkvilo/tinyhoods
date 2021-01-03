import mongoose from "mongoose";
import { isEmpty } from "ramda";

import UserModel from "../../../models/users";
import PostModel from "../../../models/posts";
import { decryptToken, requireToken } from "../../../utils";

async function likeThePost(userId, postId) {
	const response = await UserModel.findOneAndUpdate(
		{
			_id: userId,
		},
		{
			$push: {
				likedPosts: postId,
			} as any,
		}
	);

	const updateCauserListResponse = await PostModel.findOneAndUpdate(
		{ _id: postId },
		{
			$push: {
				likes: response?._id,
			} as any,
		}
	);

	return !!response && !!updateCauserListResponse;
}

async function removeLike(userId, postId) {
	const response = await UserModel.findOneAndUpdate(
		{
			_id: userId,
		},
		{
			$pull: {
				likedPosts: postId,
			} as any,
		}
	);

	if (isEmpty(response)) {
		throw new Error("User not found");
	}

	const updateCauserListResponse = await PostModel.findOneAndUpdate(
		{ _id: postId },
		{
			$pull: {
				likes: response?._id,
			} as any,
		}
	);

	return !!response && !!updateCauserListResponse;
}

export default async function (parent: any, args: any, context: any) {
	const { token, postId } = args.data;

	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		if (
			await UserModel.findOne({
				likedPosts: { $in: postId },
			})
		) {
			// Unlike
			return !!(await removeLike(userId, postId));
		}
		// like
		return !!(await likeThePost(userId, postId));
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}

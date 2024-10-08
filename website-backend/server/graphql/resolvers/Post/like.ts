import mongoose from "mongoose";
import { isEmpty } from "ramda";

import UserModel from "../../../models/users";
import PostModel from "../../../models/posts";
import {
	checkForDeactivatedUser,
	decryptToken,
	requireToken,
} from "../../../utils";

async function likeThePost(userId, postId) {
	const response = await UserModel.findOneAndUpdate(
		{
			_id: userId,
		},
		{
			$push: {
				likedPosts: mongoose.Types.ObjectId(postId),
			} as any,
		}
	);

	const updateCauserListResponse = await PostModel.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId(postId) },
		{
			$push: {
				likes: mongoose.Types.ObjectId(response?._id),
			} as any,
		}
	);

	return !!response && !!updateCauserListResponse;
}

async function removeLike(userId, postId) {
	const response = await UserModel.findOneAndUpdate(
		{
			_id: mongoose.Types.ObjectId(userId),
		},
		{
			$pull: {
				likedPosts: mongoose.Types.ObjectId(postId),
			} as any,
		}
	);

	if (isEmpty(response)) {
		throw new Error("User not found");
	}

	const updateCauserListResponse = await PostModel.findOneAndUpdate(
		{ _id: mongoose.Types.ObjectId(postId) },
		{
			$pull: {
				likes: mongoose.Types.ObjectId(response?._id),
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
		const { isDeactivated, message } = await checkForDeactivatedUser(userId);
		if (isDeactivated) throw new Error(message);

		const alreadyLiked = await UserModel.findOne({
			_id: mongoose.Types.ObjectId(userId),
			likedPosts: { $in: mongoose.Types.ObjectId(postId) },
		});

		if (alreadyLiked) {
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

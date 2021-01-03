import mongoose from "mongoose";
import PostsModel from "../../../models/posts";
import UserModel from "../../../models/users";

import { decryptToken } from "../../../utils";

async function getAllPublicPosts(page) {
	return await PostsModel.paginate(
		{ isDeleted: false, isPublished: true },
		{
			page: page,
			sort: { publishedAt: -1 },
			limit: 10,
			populate: [
				{
					path: "author",
				},
				{
					path: "likes",
				},
				{
					path: "comments",
					populate: {
						path: "author",
					},
				},
				{
					path: "recentComment",
					populate: {
						path: "author",
					},
				},
			],
		}
	);
}

async function getPersonalizedPosts(page, token) {
	const userId = (decryptToken(token) as any).id;
	const followingsDoc = await UserModel.find({
		followers: { $in: [mongoose.Types.ObjectId(userId)] },
	});

	const followingsIds = followingsDoc.map((d) =>
		mongoose.Types.ObjectId(d._id)
	);

	return await PostsModel.paginate(
		{
			isDeleted: false,
			isPublished: true,
			author: { $in: [...followingsIds, userId] },
		},
		{
			page: page,
			sort: { publishedAt: -1 },
			limit: 10,
			populate: [
				{
					path: "author",
				},
				{
					path: "likes",
				},
				{
					path: "comments",
					populate: {
						path: "author",
					},
				},
				{
					path: "recentComment",
					populate: {
						path: "author",
					},
				},
			],
		}
	);
}

export default async function getPosts(parent: any, args: any, context: any) {
	const { page, token, dataType } = args.data;

	try {
		if (!token || dataType === "public") return await getAllPublicPosts(page);
		return await getPersonalizedPosts(page, token);
	} catch (e) {
		throw new Error(e.message);
	}
}

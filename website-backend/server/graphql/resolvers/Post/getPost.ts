// import mongoose from "mongoose";
import mongoose from "mongoose";
import PostsModel from "../../../models/posts";
import { decryptToken } from "../../../utils";

/*
 * @returns: user specific meta information, which requires queries to be executed against user collection
 */
async function authenticatedUserData(id: string, userId: string) {
	const response = await PostsModel.aggregate([
		{
			$match: {
				isDeleted: false,
				isPublished: true,
				_id: mongoose.Types.ObjectId(id),
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "author",
				foreignField: "_id",
				as: "author",
			},
		},
		{
			$unwind: "$author",
		},
		{
			$project: {
				id: "$_id",
				images: 1,
				content: 1,
				author: {
					name: "$author.name",
					username: "$author.username",
					image: "$author.image",
					avatar: "$author.avatar",
				},
				likesCount: {
					$cond: {
						if: { $isArray: "$likes" },
						then: { $size: "$likes" },
						else: 0,
					},
				},
				commentsCount: {
					$cond: {
						if: { $isArray: "$comments" },
						then: { $size: "$comments" },
						else: 0,
					},
				},
				_editable: {
					$cond: {
						if: { $eq: ["$author._id", mongoose.Types.ObjectId(userId)] },
						then: true,
						else: false,
					},
				},
				_liked: {
					$cond: {
						if: { $in: [mongoose.Types.ObjectId(userId), "$likes"] },
						then: true,
						else: false,
					},
				},
				publishedAt: 1,
			},
		},
	]);
	return response[0];
}

/*
 * @returns: returns simple simple information about post, without user actions
 */
async function getData(id: string) {
	const response = await PostsModel.aggregate([
		{
			$match: {
				isDeleted: false,
				isPublished: true,
				_id: mongoose.Types.ObjectId(id),
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "author",
				foreignField: "_id",
				as: "author",
			},
		},
		{
			$unwind: "$author",
		},
		{
			$project: {
				id: "$_id",
				images: 1,
				content: 1,
				author: {
					name: "$author.name",
					username: "$author.username",
					image: "$author.image",
					avatar: "$author.avatar",
				},
				likesCount: {
					$cond: {
						if: { $isArray: "$likes" },
						then: { $size: "$likes" },
						else: 0,
					},
				},
				commentsCount: {
					$cond: {
						if: { $isArray: "$comments" },
						then: { $size: "$comments" },
						else: 0,
					},
				},
				publishedAt: 1,
			},
		},
	]);

	return response[0];
}

export default async function getPost(parent: any, args: any, context: any) {
	// TODO: update client app query
	const { token, id } = args.data;

	try {
		if (token) {
			const userId = (decryptToken(token) as any).id;
			return await authenticatedUserData(id, userId);
		}

		return await getData(id);
	} catch (e) {
		throw new Error(e.message);
	}
}

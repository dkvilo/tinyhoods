import mongoose from "mongoose";
import { Error } from "mongoose";
import PostsModel from "../../../models/posts";
import UserModel from "../../../models/users";

import { checkForDeactivatedUser, decryptToken } from "../../../utils";

/*
 * @Returns All Posts for authenticated user, also returns meta information such as _liked and _editable
 */
async function getAllPostsForAuthenticated(
	page: number = 1,
	userId: string,
	observer: string,
	limit: number = 10,
	sort: number = -1
) {
	const totalDocs = await PostsModel.countDocuments().exec();
	/* 
    |b = -1
    |dln = 15
    p(n(1) - |b) ->* l(10) -> (|dln - l(10)) = ei(5)
    p(n(3) - |b) ->* l(10) = ei(20)
  */
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const response = {
		docs: [],
		totalDocs: totalDocs,
		totalPages: null,
		prevPage: null,
		nextPage: null,
		pagingCounter: null,
		page: page,
		endIndex,
		startIndex,
	};

	if (endIndex < totalDocs) {
		response.nextPage = page + 1;
	}

	if (startIndex > 0) {
		response.prevPage = page - 1;
	}

	const results = await PostsModel.aggregate([
		{
			$match: {
				isDeleted: false,
				isPublished: true,
				author: mongoose.Types.ObjectId(userId),
			},
		},
		{
			$sort: { publishedAt: sort },
		},
		{
			$skip: startIndex,
		},
		{
			$limit: limit,
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
			$lookup: {
				from: "comments",
				localField: "recentComment",
				foreignField: "_id",
				as: "recentComment",
			},
		},
		{
			$unwind: { path: "$recentComment", preserveNullAndEmptyArrays: true },
		},
		{
			$lookup: {
				from: "users",
				localField: "recentComment.author",
				foreignField: "_id",
				as: "recentCommentAuthor",
			},
		},
		{
			$unwind: {
				path: "$recentCommentAuthor",
				preserveNullAndEmptyArrays: true,
			},
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
						if: { $eq: ["$author._id", mongoose.Types.ObjectId(observer)] },
						then: true,
						else: false,
					},
				},
				_liked: {
					$cond: {
						if: { $in: [mongoose.Types.ObjectId(observer), "$likes"] },
						then: true,
						else: false,
					},
				},
				recentComment: {
					$cond: {
						if: { $not: ["$recentComment._id"] },
						then: null,
						else: {
							id: "$recentComment._id",
							content: "$recentComment.content",
							author: {
								id: "$_id",
								username: "$recentCommentAuthor.username",
								name: "$recentCommentAuthor.name",
								image: "$recentCommentAuthor.image",
								avatar: "$recentCommentAuthor.avatar",
							},
							publishedAt: "$recentComment.publishedAt",
						},
					},
				},
				publishedAt: 1,
			},
		},
	]);

	response.docs = results;

	return response;
}

/*
 * @Returns all posts for non-authenticated user
 */
async function getAllPosts(
	page: number = 1,
	userId: string,
	limit: number = 10,
	sort: number = -1
) {
	const totalDocs = await PostsModel.countDocuments().exec();
	/* 
    |b = -1
    |dln = 15
    p(n(1) - |b) ->* l(10) -> (|dln - l(10)) = ei(5)
    p(n(3) - |b) ->* l(10) = ei(20)
  */
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const response = {
		docs: [],
		totalDocs: totalDocs,
		totalPages: null,
		prevPage: null,
		nextPage: null,
		pagingCounter: null,
		page: page,
		endIndex,
		startIndex,
	};

	if (endIndex < totalDocs) {
		response.nextPage = page + 1;
	}

	if (startIndex > 0) {
		response.prevPage = page - 1;
	}

	const results = await PostsModel.aggregate([
		{
			$match: {
				isDeleted: false,
				isPublished: true,
				author: mongoose.Types.ObjectId(userId),
			},
		},
		{
			$sort: { publishedAt: sort },
		},
		{
			$skip: startIndex,
		},
		{
			$limit: limit,
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
			$lookup: {
				from: "comments",
				localField: "recentComment",
				foreignField: "_id",
				as: "recentComment",
			},
		},
		{
			$unwind: { path: "$recentComment", preserveNullAndEmptyArrays: true },
		},
		{
			$lookup: {
				from: "users",
				localField: "recentComment.author",
				foreignField: "_id",
				as: "recentCommentAuthor",
			},
		},
		{
			$unwind: {
				path: "$recentCommentAuthor",
				preserveNullAndEmptyArrays: true,
			},
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
				recentComment: {
					$cond: {
						if: { $not: ["$recentComment._id"] },
						then: null,
						else: {
							id: "$recentComment._id",
							content: "$recentComment.content",
							author: {
								id: "$_id",
								username: "$recentCommentAuthor.username",
								name: "$recentCommentAuthor.name",
								image: "$recentCommentAuthor.image",
								avatar: "$recentCommentAuthor.avatar",
							},
							publishedAt: "$recentComment.publishedAt",
						},
					},
				},
				publishedAt: 1,
			},
		},
	]);

	response.docs = results;

	return response;
}

export default async function getUserPosts(
	parent: any,
	args: any,
	context: any
) {
	const { page, token, username } = args.data;
	try {
		const userResponse = await UserModel.findOne({
			username,
			isDeleted: false,
		});

		if (!userResponse) {
			throw new Error("User not found");
		}

		if (!token && userResponse?.isPrivate) {
			throw new Error("You don't have access");
		}

		// if user is authenticated get observer information
		if (token) {
			const userId = (decryptToken(token) as any).id;
			const { isDeactivated, message } = await checkForDeactivatedUser(userId);
			if (isDeactivated) {
				throw new Error(message);
			}
			return await getAllPostsForAuthenticated(
				page,
				userResponse._id,
				userId,
				10,
				-1
			);
		}

		// if user is not authenticated aggregate general data
		return await getAllPosts(page, userResponse._id, 10, -1);
	} catch (e) {
		throw new Error(e.message);
	}
}

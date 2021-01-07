import mongoose from "mongoose";
import PostsModel from "../../../models/posts";
import UserModel from "../../../models/users";

import { decryptToken } from "../../../utils";

/*
 * @Returns All Posts
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
			$match: { isDeleted: false, isPublished: true },
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
				likesCount: 1,
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
 * @Returns Posts from followings
 */
async function getPersonalizedPosts(
	page: number = 1,
	userId: string,
	limit: number = 10,
	sort: number = -1
) {
	const followingsDoc = await UserModel.find({
		followers: { $in: [mongoose.Types.ObjectId(userId)] },
	});

	const followingsIds = followingsDoc.map((d) =>
		mongoose.Types.ObjectId(d._id)
	);

	const totalDocs = await PostsModel.countDocuments({
		isDeleted: false,
		isPublished: true,
		author: { $in: [...followingsIds, mongoose.Types.ObjectId(userId)] },
	}).exec();

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
				author: { $in: [...followingsIds, mongoose.Types.ObjectId(userId)] },
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
				likesCount: 1,
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

export default async function getPosts(parent: any, args: any, context: any) {
	const { page, token, dataType } = args.data;

	try {
		const userId = (decryptToken(token) as any).id;

		if (dataType === "public") {
			return await getAllPosts(page, userId, 10, -1);
		} else if (dataType === "private") {
			return await getPersonalizedPosts(page, userId, 10, -1);
		} else {
			throw new Error("dataType filter is missing");
		}
	} catch (e) {
		throw new Error(e.message);
	}
}

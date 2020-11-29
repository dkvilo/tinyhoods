// import mongoose from "mongoose";
import PostsModel from "../../../models/posts";

export default async function getPost(parent: any, args: any, context: any) {
	const { id } = args;
	try {
		return await PostsModel.findOne({
			isDeleted: false,
			isPublished: true,
			_id: id as any,
		})
			.populate({
				path: "author",
			})
			.populate({
				path: "comments",
				populate: {
					path: "author",
				},
			})
			.populate({
				path: "recentComment",
				populate: {
					path: "author",
				},
			});
	} catch (e) {
		throw new Error(e.message);
	}
}

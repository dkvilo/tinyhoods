// import mongoose from "mongoose";
import PostsModel from "../../../models/posts";

export default async function getPosts(parent: any, args: any, context: any) {
	const { page } = args.data;
	try {
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
	} catch (e) {
		throw new Error(e.message);
	}
}

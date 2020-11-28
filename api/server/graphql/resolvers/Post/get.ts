// import mongoose from "mongoose";
import PostsModel from "../../../models/posts";

export default async function getPosts(parent: any, args: any, context: any) {
	const { page } = args.data;

	// this is not efficient we need to use cursor
	try {
		return await PostsModel.paginate(
			{ isDeleted: false, isPublished: true },
			{
				page: page,
				sort: { publishedAt: -1 },
				limit: 10,
				populate: "author",
			}
		);

		// .find({
		// 	isDeleted: false,
		// 	isPublished: true,
		// })
		// 	.populate({
		// 		path: "author",
		// 	})
		// 	.sort({ publishedAt: -1 })
		// 	.limit(page);

		// return await UserModel.aggregate([
		// 	{
		// 		$match: {
		// 			// _id: { $ne: mongoose.Types.ObjectId(userId) },
		// 			isDeleted: false,
		// 			isPublished: true,
		// 		},
		// 	},
		// 	{
		// 		$project: {
		// 			id: "$_id",
		// 			images: 1,
		// 			// _following: {
		// 			// 	$in: [mongoose.Types.ObjectId(userId), "$followers._id"],
		// 			// },
		// 		},
		// 	},
		// ]);
	} catch (e) {
		throw new Error(e.message);
	}
}

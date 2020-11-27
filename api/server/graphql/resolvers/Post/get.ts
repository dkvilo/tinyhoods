import mongoose from "mongoose";
// import UserModel from "../../../models/users";
import PostsModel from "../../../models/posts";
// import { decryptToken, requireToken } from "../../../utils";

export default async function getPosts(parent: any, args: any, context: any) {
	// const { token } = args.data;
	// requireToken(token);

	// const userId = (decryptToken(token) as any).id;

	try {
		return await PostsModel.find({
			isDeleted: false,
			isPublished: true,
		})
			.populate({
				path: "author",
			})
			.sort({ publishedAt: -1 });

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

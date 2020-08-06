import mongoose from "mongoose";
import QuestionModel from "../../../models/questions";
import { requireToken } from "../../../utils";

export default async function (parent: any, args: any, context: any) {
	const { location, token } = args.data;

	requireToken(token);

	try {
		const response = await QuestionModel.find({
			location: mongoose.Types.ObjectId(location),
		})
			.populate({
				path: "location",
			})
			.populate({
				path: "author",
			})
			.sort({ publishedAt: -1 });

		return response;
	} catch (e) {
		throw new Error(e.message);
	}
}

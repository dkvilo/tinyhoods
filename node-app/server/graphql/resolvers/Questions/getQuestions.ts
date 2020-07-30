import QuestionModel from "../../../models/questions";

export default async function (parent: any, args: any, context: any) {
	const response = await QuestionModel.find()
		.populate({
			path: "author",
		})
		.populate({
			path: "location",
		})
		.sort({ publishedAt: -1 });

	return response;
}

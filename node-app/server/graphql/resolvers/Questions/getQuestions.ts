import QuestionModel from "../../../models/questions";
import { requireToken } from "../../../utils";

export default async function (parent: any, args: any, context: any) {
	const { token } = args.data;
	requireToken(token);

	try {
		const response = await QuestionModel.find()
			.populate({
				path: "author",
			})
			.populate({
				path: "location",
			})
			.sort({ publishedAt: -1 });

		return response;
	} catch (e) {
		throw new Error(e.message);
	}
}

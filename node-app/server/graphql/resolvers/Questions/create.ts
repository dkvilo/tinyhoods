import QuestionsModel from "../../../models/questions";
import { requireToken, decryptToken } from "../../../utils";

export default async function createQuestion(
	parent: any,
	args: any,
	context: any
) {
	const { token, isPublished = false } = args.data;

	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		return !!(await QuestionsModel.create({
			...args.data,
			isPublished,
			publishedAt: isPublished ? Date.now() : null,
			author: userId,
		}));
	} catch (e) {
		throw new Error(e.message);
	}
}

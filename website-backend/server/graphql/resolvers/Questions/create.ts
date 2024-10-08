import QuestionsModel from "../../../models/questions";
import UserModel from "../../../models/users";

import {
	requireToken,
	decryptToken,
	checkForDeactivatedUser,
} from "../../../utils";

export default async function createQuestion(
	parent: any,
	args: any,
	context: any
) {
	const { token, isPublished = false } = args.data;

	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		const { isDeactivated, message } = await checkForDeactivatedUser(userId);
		if (isDeactivated) throw new Error(message);

		const response = await QuestionsModel.create({
			...args.data,
			isPublished,
			publishedAt: isPublished ? Date.now() : null,
			author: userId,
		});

		const userResponse = await UserModel.findOneAndUpdate(
			{
				_id: userId,
			},
			{
				$push: { questions: response._id } as any,
			}
		);

		return !!response && !!userResponse;
	} catch (e) {
		throw new Error(e.message);
	}
}

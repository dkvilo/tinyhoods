import ProjectModel from "../../../models/project";
import UserModel from "../../../models/users";

import {
	requireToken,
	decryptToken,
	checkForDeactivatedUser,
} from "../../../utils";

export default async function createProject(
	parent: any,
	args: any,
	context: any
) {
	const { token } = args.data;
	requireToken(token);

	const userId = (decryptToken(token) as any).id;

	try {
		const { isDeactivated, message } = await checkForDeactivatedUser(userId);
		if (isDeactivated) throw new Error(message);

		const response = await ProjectModel.create({
			...args.data,
			owner: userId,
		});

		const updateReps = await UserModel.findByIdAndUpdate(userId, {
			$push: { projects: response._id } as any,
		});
		return !!updateReps && !!response;
	} catch (e) {
		throw new Error(e.message);
	}
}

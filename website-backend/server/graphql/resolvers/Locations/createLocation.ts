import LocationModel from "../../../models/locations";
import UserModel from "../../../models/users";

import {
	requireToken,
	decryptToken,
	checkForDeactivatedUser,
} from "../../../utils";

export default async function createLocation(
	parent: any,
	args: any,
	context: any
) {
	const { token, isPrivate } = args.data;
	requireToken(token);

	const userId = (decryptToken(token) as any).id;

	try {
		const { isDeactivated, message } = await checkForDeactivatedUser(userId);
		if (isDeactivated) throw new Error(message);

		const response = await LocationModel.create({
			...args.data,
			explorer: userId,
		});

		if (isPrivate) {
			const updateReps = await UserModel.findByIdAndUpdate(userId, {
				$push: { locations: response._id } as any,
			});
			return !!updateReps && !!response;
		}

		return !!response;
	} catch (e) {
		throw new Error(e.message);
	}
}

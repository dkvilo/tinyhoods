import UserModel from "../../../models/users";
import {
	requireToken,
	decryptToken,
	checkForDeactivatedUser,
} from "../../../utils";

export default async function updateAccountPrivacy(
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

		const user = await UserModel.findByIdAndUpdate(
			{ _id: userId },
			{
				isPrivate: isPrivate,
			}
		);
		if (!user) {
			throw new Error("Access denied! User credentials are not matching");
		}
		return true;
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}

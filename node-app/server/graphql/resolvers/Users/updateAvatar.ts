import UserModel from "../../../models/users";
import { requireToken, decryptToken } from "../../../utils";

export default async function updateAvatar(
	parent: any,
	args: any,
	context: any
) {
	const { token, avatar } = args.data;

	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		const user = await UserModel.findByIdAndUpdate(
			{ _id: userId },
			{
				image: avatar,
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

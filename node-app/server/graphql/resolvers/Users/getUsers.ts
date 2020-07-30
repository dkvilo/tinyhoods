import UserModel from "../../../models/users";

import { requireToken } from "../../../utils";

export default async function getUsers(parent: any, args: any, context: any) {
	const { token } = args.data;
	requireToken(token);

	try {
		return await UserModel.find({
			isDeleted: false,
		});
	} catch (e) {
		throw new Error(e.message);
	}
}

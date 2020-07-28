import UserModel from "../../../models/users";

import { decryptToken, requireToken } from "../../../utils";

export default async function getMyInfo(parent: any, args: any, context: any) {
	const { token } = args.data;

	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		const response = await UserModel.findById(userId);
		if (!response) {
			throw new Error("User not found, Invalid Token");
		}

		return {
			...response.toObject(),
			avatar: `/api/avatar/twitter?username=${(response as any).username}`,
		};
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}

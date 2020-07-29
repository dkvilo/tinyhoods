import UserModel from "../../../models/users";

export default async function getUser(parent: any, args: any, context: any) {
	const { username } = args;

	try {
		const response = await UserModel.findOne({
			username,
		});

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

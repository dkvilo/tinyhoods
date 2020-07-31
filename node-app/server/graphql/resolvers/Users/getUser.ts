import UserModel from "../../../models/users";
import { isEmpty } from "ramda";

export default async function getUser(parent: any, args: any, context: any) {
	const { username } = args;

	try {
		const response = await UserModel.aggregate([
			{ $match: { username: username } },
			{
				$project: {
					username: 1,
					name: 1,
					about: 1,
					link: 1,
					isPrivate: 1,
					followingCount: { $size: "$following" },
					followersCount: { $size: "$followers" },
					locationCount: { $size: "$locations" },
					questionsCount: { $size: "$questions" },
				},
			},
		]);

		if (isEmpty(response)) {
			throw new Error("User not found, Invalid Token");
		}

		return {
			...response[0],
			avatar: `/api/avatar/twitter?username=${(response[0] as any).username}`,
		};
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}

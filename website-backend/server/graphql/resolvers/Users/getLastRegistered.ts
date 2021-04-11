import UserModel from "../../../models/users";

export default async function getLastRegisteredUsers(
	parent: any,
	args: any,
	context: any
) {
	try {
		return await UserModel.aggregate([
			{
				$match: {
					// Don't Show deactivated users
					isDeleted: false,
					// Don't Show users with private account
					isPrivate: false,
				},
			},
			{ $sort: { created_at: -1 } },
			{ $limit: 5 },
			{
				$project: {
					id: "$_id",
					avatar: 1,
					image: 1,
					name: 1,
					username: 1,
					about: 1,
					link: 1,
					isPrivate: 1,
					created_at: 1,
				},
			},
		]);
	} catch (e) {
		throw new Error(e.message);
	}
}

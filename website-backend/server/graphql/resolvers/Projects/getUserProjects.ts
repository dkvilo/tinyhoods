import ProjectsModel from "../../../models/project";
import UsersModel from "../../../models/users";

export default async function getUserProjects(
	parent: any,
	args: any,
	context: any
) {
	const { username, page, token } = args;
	try {
		// Find the user
		const user = await UsersModel.findOne({ username });
		if (!user) {
			throw new Error("User not found");
		}

		if (!token && user.isPrivate) {
			throw new Error("You don't have access");
		}

		return await (ProjectsModel as any).paginate(
			{ isDeleted: false, author: user._id, isPrivate: false },
			{
				page: page,
				sort: { publishedAt: -1 },
				limit: 10,
				populate: [
					{
						path: "followers",
					},
					{
						path: "author",
					},
				],
			}
		);
	} catch (e) {
		throw new Error(e.message);
	}
}

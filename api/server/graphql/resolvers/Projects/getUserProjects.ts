import ProjectsModel from "../../../models/project";

export default async function getUserProjects(
	parent: any,
	args: any,
	context: any
) {
	const { id, page } = args;
	try {
		return await ProjectsModel.paginate(
			{ isDeleted: false, owner: id },
			{
				page: page,
				sort: { publishedAt: -1 },
				limit: 10,
				populate: [
					{
						path: "followers",
					},
					{
						path: "owner",
					},
				],
			}
		);
	} catch (e) {
		throw new Error(e.message);
	}
}

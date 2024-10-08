import CommentsModel from "../../../models/comment";

export default async function getComments(
	parent: any,
	args: any,
	context: any
) {
	const { id, page } = args;
	try {
		return await (CommentsModel as any).paginate(
			{ isDeleted: false, isPublished: true, onModelSelector: id as any },
			{
				page: page,
				sort: { publishedAt: -1 },
				limit: 10,
				populate: [
					{
						path: "author",
					},
					{
						path: "replies",
						populate: {
							path: "author",
						},
					},
				],
			}
		);
	} catch (e) {
		throw new Error(e.message);
	}
}

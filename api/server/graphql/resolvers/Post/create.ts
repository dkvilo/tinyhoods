import { isEmpty } from "ramda";
import PostsModel from "../../../models/posts";
import UserModel from "../../../models/users";

import { requireToken, decryptToken } from "../../../utils";

export default async function createPost(parent: any, args: any, context: any) {
	type Images = {
		index: number;
		src: string;
	};

	interface Params {
		token: string;
		isPublished: boolean;
		content: string;
		location: string | null;
		images: Images[];
	}

	const {
		token,
		isPublished = false,
		content,
		images,
		location,
	}: Params = args.data;

	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		if (isEmpty(content) && isEmpty(images)) {
			throw new Error("You have to provide the Content for the Post");
		}

		const response = await PostsModel.create({
			...args.data,
			isPublished,
			publishedAt: isPublished ? Date.now() : null,
			author: userId,
		});

		const userResponse = await UserModel.findOneAndUpdate(
			{
				_id: userId,
			},
			{
				$push: { posts: response._id } as any,
			}
		);

		return !!response && !!userResponse;
	} catch (e) {
		throw new Error(e.message);
	}
}

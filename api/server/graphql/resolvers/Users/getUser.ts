import UserModel from "../../../models/users";
import { isEmpty } from "ramda";

export default async function getUser(parent: any, args: any, context: any) {
	const { username } = args;

	try {
		const response = await UserModel.aggregate([
			{ $match: { username: username } },
			{
				$lookup: {
					from: "users",
					localField: "following",
					foreignField: "_id",
					as: "following",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "followers",
					foreignField: "_id",
					as: "followers",
				},
			},
			{
				$lookup: {
					from: "locations",
					localField: "locations",
					foreignField: "_id",
					as: "locations",
				},
			},
			{
				$lookup: {
					from: "questions",
					localField: "questions",
					foreignField: "_id",
					as: "questions",
				},
			},
			{
				$project: {
					username: 1,
					name: 1,
					about: 1,
					link: 1,
					image: 1,
					avatar: 1,
					followers: 1,
					following: 1,
					locations: 1,
					questions: 1,
					isPrivate: 1,
					membership: 1,
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

		return response[0];
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}

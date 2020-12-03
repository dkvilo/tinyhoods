import UserModel from "../../../models/users";

import { decryptToken, requireToken } from "../../../utils";
import mongoose from "mongoose";
import { isEmpty } from "ramda";

export default async function getMyInfo(parent: any, args: any, context: any) {
	const { token } = args.data;

	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		const response = await UserModel.aggregate([
			{ $match: { _id: mongoose.Types.ObjectId(userId) } },
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

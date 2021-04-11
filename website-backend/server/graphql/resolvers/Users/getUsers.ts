import mongoose from "mongoose";
import UserModel from "../../../models/users";

import { decryptToken, requireToken } from "../../../utils";

export default async function getUsers(parent: any, args: any, context: any) {
	const { token, max } = args.data;
	requireToken(token);

	const userId = (decryptToken(token) as any).id;

	try {
		return await UserModel.aggregate([
			{
				$match: {
					// Don't Show current user
					_id: { $ne: mongoose.Types.ObjectId(userId) },
					// Don't Show users which current user is following
					followers: { $nin: ["_id", mongoose.Types.ObjectId(userId)] },
					// Don't Show deactivated users
					isDeleted: false,
					// Don't Show users with private account
					isPrivate: false,
				},
			},
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
			{ $limit: max },
			{ $sort: { created_at: -1 } },
			{
				$project: {
					id: "$_id",
					avatar: 1,
					image: 1,
					email: 1,
					name: 1,
					username: 1,
					about: 1,
					link: 1,
					isPrivate: 1,
					followers: 1,
					questions: 1,
					following: 1,
					locations: 1,
					created_at: 1,
					questionsCount: 1,
					followersCount: 1,
					followingCount: 1,
					locationCount: 1,
					membership: 1,
					_following: {
						$in: [mongoose.Types.ObjectId(userId), "$followers._id"],
					},
				},
			},
		]);
	} catch (e) {
		throw new Error(e.message);
	}
}

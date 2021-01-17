import mongoose from "mongoose";
import { isEmpty } from "ramda";

import UserModel from "../../../models/users";
import {
	checkForDeactivatedUser,
	decryptToken,
	requireToken,
} from "../../../utils";

export default async function unfollowUser(
	parent: any,
	args: any,
	context: any
) {
	const { token, username } = args.data;

	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		const { isDeactivated, message } = await checkForDeactivatedUser(userId);
		if (isDeactivated) throw new Error(message);

		{
			const response = await UserModel.findOne({
				username,
				followers: { $in: userId },
			});

			if (!response) {
				throw new Error("You are not following");
			}
		}

		const response = await UserModel.findOneAndUpdate(
			{
				username,
			},
			{
				$pull: {
					followers: userId,
				} as any,
			}
		);

		if (isEmpty(response)) {
			throw new Error("User not found");
		}

		const updateCauserListResponse = await UserModel.findOneAndUpdate(
			{ _id: userId },
			{
				$pull: {
					following: response?._id,
				} as any,
			}
		);

		return !!response && !!updateCauserListResponse;
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}

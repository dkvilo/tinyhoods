import mongoose from "mongoose";
import { isEmpty } from "ramda";

import UserModel from "../../../models/users";
import {
	checkForDeactivatedUser,
	decryptToken,
	requireToken,
} from "../../../utils";

export default async function followUser(parent: any, args: any, context: any) {
	const {
		token,
		username,
	}: {
		token: string;
		username: string;
	} = args.data;

	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		const { isDeactivated, message } = await checkForDeactivatedUser(userId);
		if (isDeactivated) throw new Error(message);

		{
			const response = await UserModel.findOne({
				username: username.toLowerCase(),
				followers: { $in: userId },
			});

			if (response) {
				throw new Error("You are already following");
			}
		}

		const response = await UserModel.findOneAndUpdate(
			{
				username: username.toLowerCase(),
			},
			{
				$push: {
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
				$push: {
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

import moment from "moment";

import UsersModel from "../../../../models/users";

import { stripeClient } from "../../../../providers";
import { requireToken, decryptToken } from "../../../../utils";

function calculateExpirationDate(plan: string) {
	switch (plan) {
		case "price_1HBQooESEHCrAVLIBQazf6AS": // Weekend
			return moment().add(2, "days").format();
		case "price_1HBQiIESEHCrAVLILl4CUtAk": //Week
			return moment().add(7, "days").format();
		case "price_1HBQhIESEHCrAVLIZJiX6H3b": // Season Lite 1 month
			return moment().add(1, "months").format();
		case "price_1HBQg4ESEHCrAVLI36hJWM7Q": // Season Lite 1 month
			return moment().add(3, "months").format();
		case "price_1HBRPPESEHCrAVLIXEpmLCke": // Lifetime Pass
			return moment().add(888, "years").format();
	}
}

export default async function confirmCheckout(
	parent: any,
	args: any,
	context: any
) {
	let { sessionId, user, token, plan } = args?.data;

	if (!token) {
		throw new Error("Required User Access Token");
	}

	if (!user) {
		user = (decryptToken(token) as any).id;
	}

	requireToken(token);

	if (!sessionId) {
		throw new Error("Payment session was not provided");
	}

	try {
		const session = await stripeClient.checkout.sessions.retrieve(sessionId);

		const { id } = session;

		if (sessionId !== id) {
			throw new Error("Invalid checkout session");
		}

		// Weekend      price_1HBQooESEHCrAVLIBQazf6AS
		// Week         price_1HBQiIESEHCrAVLILl4CUtAk
		// Season Lite  price_1HBQhIESEHCrAVLIZJiX6H3b
		// Season       price_1HBQg4ESEHCrAVLI36hJWM7Q
		// Citizen      price_1HBRPPESEHCrAVLIXEpmLCke
		const response = await UsersModel.findByIdAndUpdate(user, {
			membership: {
				isPaid: plan === "price_1HBRPPESEHCrAVLIXEpmLCke" ? true : false,
				startedAt: Date.now(),
				expiresAt: calculateExpirationDate(plan),
			},
		});

		return !!response;
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}

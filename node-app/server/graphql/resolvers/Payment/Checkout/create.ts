import { stripeClient } from "../../../../providers";
import config from "../../../../../shared/config";
import { requireToken, decryptToken } from "../../../../utils";

export default async function createCheckout(
	parent: any,
	args: any,
	context: any
) {
	const { token, price, quantity = 1 } = args?.data;

	if (!token) {
		throw new Error("Required User Access Token");
	}

	if (!price) {
		throw new Error("price was not provided");
	}

	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		const { checkout } = config.externalServices.stripe;
		const session = await stripeClient.checkout.sessions.create({
			payment_method_types: (checkout.paymentMethods as string).split(",") as [

			],
			mode: "payment",
			line_items: [
				{
					price: price,
					quantity,
				},
			],
			success_url: `${checkout.successUrl}?session_id={CHECKOUT_SESSION_ID}&user=${userId}&plan=${price}`,
			cancel_url: checkout.cancelUrl as string,
		});

		if (!session) {
			throw new Error("Unable to create checkout session");
		}

		return session;
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}

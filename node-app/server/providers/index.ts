import stripe from "stripe";

import config from "../../shared/config";

const {
	externalServices: {
		stripe: { secretKey },
	},
} = config;

export const stripeClient = new stripe(secretKey as string, {
	apiVersion: "2020-03-02",
	typescript: true,
});

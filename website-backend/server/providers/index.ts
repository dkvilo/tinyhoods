import stripe from "stripe";
import Queue from "bull";
import nodemailer from "nodemailer";
import config from "../../shared/config";

const {
	externalServices: {
		stripe: { secretKey },
	},
	internalServices: {
		redis: { uri, password, port, queueDefaultDb },
	},
} = config;

export const stripeClient = new stripe(secretKey as string, {
	apiVersion: "2020-08-27",
	typescript: true,
});

const redisAuth = {
	port,
	host: uri,
	db: queueDefaultDb,
};

if (process.env.NODE_ENV === "development") {
	Object.assign(redisAuth, {
		password,
	});
}

const queueOptions = {
	prefix: config.internalServices.queue.email.prefix,
	redis: redisAuth,
};

export const emailQueue = new Queue("mailing", queueOptions as any);

export const nodemailerMailgunNoReply = nodemailer.createTransport({
	host: config.externalServices.mailgun.host,
	port: Number(config.externalServices.mailgun.port),
	auth: {
		user: config.externalServices.mailgun.noReplay.auth.email,
		pass: config.externalServices.mailgun.noReplay.auth.password,
	},
});

// verify connection configuration for mailgun
nodemailerMailgunNoReply.verify((error) => {
	if (error) {
		console.log(" - [x] Mailgun Server Confection Issue: ", error);
	} else {
		console.log(" - Mailgun Server is ready");
	}
});

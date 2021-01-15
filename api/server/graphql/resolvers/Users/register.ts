import UsersModel from "../../../models/users";

import {
	encrypt,
	requestEmailValidation,
	requestUsernameValidation,
	requestPasswordValidation,
	generateRandomHash,
	generateAvatar,
} from "../../../utils";

import config from "../../../../shared/config";
import scheduler from "../../../services/queue/scheduler";

export default async function createUser(parent: any, args: any, context: any) {
	const { email, password, name, username } = args?.data;

	await requestEmailValidation(email);

	requestPasswordValidation(password);
	requestUsernameValidation(username);

	try {
		{
			const response = await UsersModel.findOne({ email });
			if (response) {
				throw new Error("Email Address is taken");
			}
		}

		{
			const response = await UsersModel.findOne({ username });
			if (response) {
				throw new Error("Username is taken");
			}
		}

		const emailActivationCode = generateRandomHash();

		const response = await UsersModel.create({
			username,
			email,
			password: encrypt(password, (config as any).app.secrets.password),
			name,
			emailActivateHash: emailActivationCode,
			avatar: `data:image/png;base64,${(
				await generateAvatar(username)
			).toString("base64")}`,
		});

		if (!!response) {
			scheduler({
				name: "registration:success",
				time: 1000,
				receiver: {
					to: email,
					subject: "Tiny Hoods - Registration Completed",
					params: {
						username,
						name,
						hasAction: false,
					},
				},
			});
		}

		return !!response;
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}

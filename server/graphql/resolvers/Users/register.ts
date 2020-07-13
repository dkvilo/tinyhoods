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
			avatar: {
				data: await generateAvatar(username),
				contentType: "png",
			},
		});

		return !!response;
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}

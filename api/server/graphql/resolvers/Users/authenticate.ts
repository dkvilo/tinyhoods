import UsersModel from "../../../models/users";

import { encrypt, signToken } from "../../../utils";

import config from "../../../../shared/config";
import scheduler from "../../../services/queue/scheduler";

export default async function authenticateUser(
	parent: any,
	args: any,
	context: any
) {
	const { email, password } = args?.data;

	try {
		const response = await UsersModel.findOne({
			email,
			password: encrypt(password, (config as any).app.secrets.password),
			isDeleted: false,
		});

		if (!response) {
			throw new Error("email or password are not matching");
		}

		const { refreshToken } = signToken(response);

		return { token: refreshToken };
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}

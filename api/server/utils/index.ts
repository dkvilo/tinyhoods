import crypto from "crypto";
import { sign, verify } from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import isURL from "validator/lib/isURL";

import config from "../../shared/config";
import avatarify from "../services/avatar";

import UserModel from "../../server/models/users";

export function encrypt(string: string, salt: string) {
	const hash = crypto.createHmac("sha512", salt);
	hash.update(string);
	return hash.digest("hex");
}

export function signToken({ _id, isAdmin }: any) {
	const accessToken = sign(
		{ id: _id },
		(config as any).app.secrets.accessToken,
		{
			expiresIn: "15min",
		}
	);
	const refreshToken = sign(
		{ id: _id, isAdmin: isAdmin },
		(config as any).app.secrets.refreshToken,
		{
			expiresIn: "8888 years", // hm, it looks lifetime for me
		}
	);
	return { accessToken, refreshToken };
}

export function generateRandomHash(size = 20, toUpperCase = false) {
	return toUpperCase
		? crypto.randomBytes(size).toString("hex").toUpperCase()
		: crypto.randomBytes(size).toString("hex");
}

export async function generateAvatar(username: string) {
	return await avatarify(username);
}

export function decryptToken(token: string) {
	try {
		return verify(token, (config as any).app.secrets.refreshToken);
	} catch (error) {
		const { message } = error;
		throw new Error(message);
	}
}

export function requireToken(
	token: string,
	requireAuth = true,
	isAdmin = false
) {
	if (requireAuth && !token) {
		throw new Error("Required Authenticated user access");
	}

	try {
		const decoded: any = verify(
			token,
			(config as any).app.secrets.refreshToken
		);
		if (requireAuth && isAdmin && !decoded.isAdmin) {
			throw new Error("Permission denied");
		}
	} catch (error) {
		const { name, message, expiredAt } = error;

		if (name === "TokenExpiredError") {
			throw new Error(`[Refresh-Token]: ${message} - at: ${expiredAt}`);
		}

		throw new Error("Required Authenticated user access");
	}

	return null;
}

export async function checkForDeactivatedUser(id: string, username: string) {
	try {
		const user: any = await UserModel.findById(id);
		if (user && user.isDeleted) {
			return {
				isDeactivated: true,
				message: "Access Denied. User was found or Account is deactivated",
			};
		}
		if (username) {
			const user = await UserModel.findOne({
				username,
				isDeleted: false,
			});
			if (!user) {
				return {
					isDeactivated: true,
					message: "The Account was deactivated by the owner",
				};
			}
		}
	} catch (e) {
		const { message } = e;
		throw new Error(message);
	}
	return { isDeactivated: false, message: null, decryptedUserID: id };
}

export async function requestEmailValidation(email: any) {
	if (!isEmail(email)) throw new Error("Invalid Email Address");
}

export function requestPasswordValidation(password: string) {
	if (!isLength(password, { min: 6 })) {
		throw new Error("Password must be at least 6 characters");
	}
}

export function requestUsernameValidation(username: string) {
	if (!isLength(username, { min: 2 })) {
		throw new Error("Username must be at least 2 characters");
	}
}

export function requestURLValidation(url: string) {
	if (
		!isURL(url, {
			protocols: ["http", "https"],
			require_protocol: true,
		})
	) {
		throw new Error("Provided URL is not valid");
	}
}

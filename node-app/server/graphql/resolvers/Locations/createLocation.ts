import LocationModel from "../../../models/locations";

import { requireToken, decryptToken } from "../../../utils";

export default async function createLocation(
	parent: any,
	args: any,
	context: any
) {
	const { token } = args.data;
	requireToken(token);
	const userId = (decryptToken(token) as any).id;

	try {
		return !!(await LocationModel.create({
			...args.data,
			explorer: userId,
		}));
	} catch (e) {
		throw new Error(e.message);
	}
}
